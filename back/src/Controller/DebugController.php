<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;

class DebugController extends AbstractController
{
    #[Route('/api/debug-validation', name: 'api_debug_validation', methods: ['POST'])]
    public function debugValidation(ValidatorInterface $validator): JsonResponse
    {
        // Créer un utilisateur avec des données invalides pour tester
        $user = new User();
        $user->setEmail('invalid-email'); // Email invalide
        $user->setPassword('123'); // Mot de passe trop court si vous avez une validation

        $violations = $validator->validate($user);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $errors[] = [
                    'property' => $violation->getPropertyPath(),
                    'message' => $violation->getMessage(),
                    'invalid_value' => $violation->getInvalidValue()
                ];
            }

            // Simuler une erreur API Platform
            throw new UnprocessableEntityHttpException(json_encode($errors));
        }

        return new JsonResponse(['status' => 'ok']);
    }
}
