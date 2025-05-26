<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    #[Route('/api/users', name: 'app_user')]
    public function getUSers(UserRepository $userRepository): JsonResponse
    {
        $userList = $userRepository->findAll();

        return new JsonResponse([
            'users' => $userList
        ]);
    }
}
