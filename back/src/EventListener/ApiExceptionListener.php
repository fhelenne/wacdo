<?php

namespace App\EventListener;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Validator\Exception\ValidationFailedException;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Serializer\Exception\ExceptionInterface as SerializerExceptionInterface;

class ApiExceptionListener implements EventSubscriberInterface
{
    public function __construct(
        private TranslatorInterface $translator,
        private SerializerInterface $serializer
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::EXCEPTION => ['onKernelException', 1000], // Priorité maximale
        ];
    }

    public function onKernelException(ExceptionEvent $event): void
    {
        $request = $event->getRequest();

        // Ne traiter que les requêtes API (vérifier plusieurs patterns)
        $isApiRequest = str_starts_with($request->getPathInfo(), '/api/') ||
                       str_contains($request->headers->get('Accept', ''), 'application/ld+json') ||
                       str_contains($request->headers->get('Content-Type', ''), 'application/ld+json') ||
                       str_contains($request->headers->get('Content-Type', ''), 'application/json');

        if (!$isApiRequest) {
            return;
        }

        $exception = $event->getThrowable();
        $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;

        if ($exception instanceof HttpExceptionInterface) {
            $statusCode = $exception->getStatusCode();
        }

        // Déterminer le domaine de traduction approprié
        $translationDomain = $this->getTranslationDomain($exception);

        // Extraire les paramètres du message d'exception
        $parameters = $this->extractMessageParameters($exception->getMessage());

        // Traduire le message d'exception avec gestion des paramètres
        $translatedMessage = $this->translateMessage($exception->getMessage(), $parameters, $translationDomain);
        $translatedTitle = $this->getTranslatedTitle($statusCode, $exception);

        // Gérer spécifiquement les erreurs de validation
        if ($exception instanceof ValidationFailedException) {
            $violations = $exception->getViolations();
            $translatedViolations = $this->translateViolations($violations);

            // Créer une description plus claire pour les violations
            $violationSummary = $this->createViolationSummary($translatedViolations);

            $errorResponse = [
                '@context' => '/api/contexts/ConstraintViolationList',
                '@type' => 'ConstraintViolationList',
                'hydra:title' => $translatedTitle,
                'hydra:description' => $violationSummary ?: $translatedMessage ?: $translatedTitle,
                'violations' => $translatedViolations,
            ];
        } else {
            $errorResponse = [
                '@context' => '/api/contexts/Error',
                '@type' => 'hydra:Error',
                'hydra:title' => $translatedTitle,
                'hydra:description' => $translatedMessage ?: $translatedTitle,
            ];
        }

        $response = new Response(
            $this->serializer->serialize($errorResponse, 'json'),
            $statusCode,
            ['Content-Type' => 'application/ld+json; charset=utf-8']
        );

        $event->setResponse($response);
    }

    private function getTranslationDomain(\Throwable $exception): string
    {
        // Déterminer le domaine de traduction basé sur le type d'exception
        if ($exception instanceof ValidationFailedException) {
            return 'validators';
        }

        // Vérifier si c'est une exception API Platform par le namespace
        $exceptionClass = get_class($exception);
        if (str_contains($exceptionClass, 'ApiPlatform') || 
            $exception instanceof SerializerExceptionInterface) {
            return 'api_platform';
        }

        return 'messages';
    }

    private function extractMessageParameters(string $message): array
    {
        $parameters = [];

        // Extraire les paramètres de type "%param%" du message
        if (preg_match_all('/%([^%]+)%/', $message, $matches)) {
            foreach ($matches[1] as $match) {
                $parameters[$match] = $match; // Valeur par défaut
            }
        }

        // Extraire les paramètres de type "{{param}}" du message
        if (preg_match_all('/\{\{([^}]+)\}\}/', $message, $matches)) {
            foreach ($matches[1] as $match) {
                $parameters[trim($match)] = trim($match); // Valeur par défaut
            }
        }

        return $parameters;
    }

    private function translateMessage(string $message, array $parameters = [], string $domain = 'messages'): string
    {
        // Vérifier si c'est un message de violation au format "field: message"
        if (preg_match('/^([^:]+):\s*(.+)$/', $message, $matches)) {
            $field = trim($matches[1]);
            $violationMessage = trim($matches[2]);

            // Traduire le message de violation
            $translatedViolation = $this->translateViolationMessage($violationMessage);

            // Traduire le nom du champ si possible
            $translatedField = $this->translator->trans($field, [], 'messages');
            if ($translatedField === $field) {
                // Si pas de traduction spécifique, garder le nom du champ tel quel
                $translatedField = ucfirst($field);
            }

            return $translatedField . ' : ' . $translatedViolation;
        }

        // D'abord, essayer de traduire le message tel quel
        $translated = $this->translator->trans($message, $parameters, $domain);

        // Si pas de traduction trouvée, essayer avec d'autres domaines
        if ($translated === $message) {
            $domains = ['validators', 'api_platform', 'messages', 'security'];

            foreach ($domains as $testDomain) {
                if ($testDomain !== $domain) {
                    $translated = $this->translator->trans($message, $parameters, $testDomain);
                    if ($translated !== $message) {
                        break;
                    }
                }
            }
        }

        // Si toujours pas de traduction, essayer de détecter des patterns spécifiques
        if ($translated === $message) {
            // Patterns pour les messages de validation DateTime
            if (str_contains($message, 'not an string, an empty string, or null')) {
                return 'Format de date invalide. Veuillez fournir une date valide.';
            }

            if (str_contains($message, 'Failed to parse time string')) {
                return 'Impossible d\'analyser la date fournie.';
            }

            if (str_contains($message, 'datetime') && str_contains($message, 'invalid')) {
                return 'Date/heure invalide.';
            }

            // Patterns génériques
            $commonPatterns = [
                'Not Found' => 'Ressource non trouvée',
                'Bad Request' => 'Requête incorrecte',
                'Unauthorized' => 'Non autorisé',
                'Forbidden' => 'Accès interdit',
                'Internal Server Error' => 'Erreur interne du serveur',
                'Method Not Allowed' => 'Méthode non autorisée',
                'Invalid' => 'Invalide',
                'Required' => 'Obligatoire',
                'Empty' => 'Vide',
            ];

            foreach ($commonPatterns as $pattern => $translation) {
                if (str_contains($message, $pattern)) {
                    return $translation;
                }
            }
        }

        return $translated;
    }

    private function translateViolationMessage(string $violationMessage): string
    {
        // D'abord essayer de traduire avec le domaine validators
        $translated = $this->translator->trans($violationMessage, [], 'validators');

        // Si pas trouvé, essayer avec d'autres domaines
        if ($translated === $violationMessage) {
            $domains = ['messages', 'api_platform'];
            foreach ($domains as $domain) {
                $translated = $this->translator->trans($violationMessage, [], $domain);
                if ($translated !== $violationMessage) {
                    break;
                }
            }
        }

        return $translated;
    }

    private function getTranslatedTitle(int $statusCode, \Throwable $exception): string
    {
        // Messages de titre basés sur le code de statut
        $titleMap = [
            400 => 'Requête incorrecte',
            401 => 'Non autorisé',
            403 => 'Accès interdit',
            404 => 'Ressource non trouvée',
            405 => 'Méthode non autorisée',
            409 => 'Conflit',
            422 => 'Entité non traitable',
            500 => 'Erreur interne du serveur',
        ];

        if (isset($titleMap[$statusCode])) {
            return $titleMap[$statusCode];
        }

        // Titre générique traduit
        return $this->translator->trans('An error occurred', [], 'messages');
    }

    private function translateViolations(ConstraintViolationListInterface $violations): array
    {
        $translatedViolations = [];

        foreach ($violations as $violation) {
            $translatedMessage = $this->translator->trans(
                $violation->getMessage(),
                $violation->getParameters(),
                'validators'
            );

            // Si pas de traduction trouvée, essayer d'autres domaines
            if ($translatedMessage === $violation->getMessage()) {
                $translatedMessage = $this->translateViolationMessage($violation->getMessage());
            }

            $translatedViolations[] = [
                'propertyPath' => $violation->getPropertyPath(),
                'message' => $translatedMessage,
                'code' => $violation->getCode(),
            ];
        }

        return $translatedViolations;
    }

    private function createViolationSummary(array $translatedViolations): string
    {
        if (empty($translatedViolations)) {
            return $this->translator->trans('Validation error', [], 'validators');
        }

        if (count($translatedViolations) === 1) {
            $violation = $translatedViolations[0];
            $fieldName = $this->translator->trans($violation['propertyPath'], [], 'messages');
            return $fieldName . ' : ' . $violation['message'];
        }

        // Pour plusieurs violations, créer une liste avec des retours à la ligne
        $summary = $this->translator->trans('Multiple validation errors', [], 'validators') . ' :';

        foreach ($translatedViolations as $violation) {
            $fieldName = $this->translator->trans($violation['propertyPath'], [], 'messages');
            $summary .= '\n• ' . $fieldName . ' : ' . $violation['message'];
        }

        return $summary;
    }
}
