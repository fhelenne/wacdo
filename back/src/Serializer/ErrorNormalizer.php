<?php

namespace App\Serializer;

use ApiPlatform\Symfony\Validator\Exception\ValidationException;
use Symfony\Component\ErrorHandler\Exception\FlattenException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class ErrorNormalizer implements NormalizerInterface
{
    public function __construct(
        private TranslatorInterface $translator
    ) {
    }

    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;
        $message = 'An error occurred';

        if ($object instanceof HttpExceptionInterface) {
            $statusCode = $object->getStatusCode();
            $message = $object->getMessage();
        } elseif ($object instanceof ValidationException) {
            $statusCode = Response::HTTP_UNPROCESSABLE_ENTITY;
            $violations = [];

            foreach ($object->getConstraintViolationList() as $violation) {
                $translatedMessage = $this->translateMessage($violation->getMessage());
                $fieldName = $this->translator->trans($violation->getPropertyPath(), [], 'messages');

                $violations[] = [
                    'propertyPath' => $violation->getPropertyPath(),
                    'message' => $translatedMessage,
                    'code' => $violation->getCode(),
                ];
            }

            return [
                '@context' => '/api/contexts/ConstraintViolationList',
                '@type' => 'ConstraintViolationList',
                'hydra:title' => $this->getTranslatedTitle($statusCode),
                'hydra:description' => $this->createViolationSummary($violations),
                'violations' => $violations,
            ];
        } elseif ($object instanceof FlattenException) {
            $statusCode = $object->getStatusCode();
            $message = $object->getMessage();
        }

        return [
            '@context' => '/api/contexts/Error',
            '@type' => 'hydra:Error',
            'hydra:title' => $this->getTranslatedTitle($statusCode),
            'hydra:description' => $this->translateMessage($message),
        ];
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof \Throwable || $data instanceof FlattenException;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            \Throwable::class => true,
            FlattenException::class => true,
        ];
    }

    private function translateMessage(string $message): string
    {
        // Gérer les messages de violation au format "field: message"
        if (preg_match('/^([^:]+):\s*(.+)$/', $message, $matches)) {
            $field = trim($matches[1]);
            $violationMessage = trim($matches[2]);

            // Traduire le nom du champ
            $translatedField = $this->translator->trans($field, [], 'messages');
            if ($translatedField === $field) {
                $translatedField = ucfirst($field);
            }

            // Traduire le message de violation
            $translatedViolation = $this->translator->trans($violationMessage, [], 'validators');
            if ($translatedViolation === $violationMessage) {
                $translatedViolation = $this->translator->trans($violationMessage, [], 'messages');
            }

            return $translatedField . ' : ' . $translatedViolation;
        }

        // Essayer de traduire avec différents domaines
        $domains = ['validators', 'messages', 'api_platform', 'security'];

        foreach ($domains as $domain) {
            $translated = $this->translator->trans($message, [], $domain);
            if ($translated !== $message) {
                return $translated;
            }
        }

        return $message;
    }

    private function getTranslatedTitle(int $statusCode): string
    {
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

        return $titleMap[$statusCode] ?? $this->translator->trans('An error occurred', [], 'messages');
    }

    private function createViolationSummary(array $violations): string
    {
        if (empty($violations)) {
            return $this->translator->trans('Validation error', [], 'validators');
        }

        if (count($violations) === 1) {
            $violation = $violations[0];
            $fieldName = $this->translator->trans($violation['propertyPath'], [], 'messages');
            return $fieldName . ' : ' . $violation['message'];
        }

        // Pour plusieurs violations, créer une liste avec des retours à la ligne
        $summary = $this->translator->trans('Multiple validation errors', [], 'validators') . ' :';

        foreach ($violations as $violation) {
            $fieldName = $this->translator->trans($violation['propertyPath'], [], 'messages');
            $summary .= '\n• ' . $fieldName . ' : ' . $violation['message'];
        }

        return $summary;
    }
}
