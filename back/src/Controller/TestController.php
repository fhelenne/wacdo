<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route('/api/test-error-404', name: 'api_test_error_404', methods: ['GET'])]
    public function testError404(): JsonResponse
    {
        throw new NotFoundHttpException('Item not found for "123".');
    }

    #[Route('/api/test-error-400', name: 'api_test_error_400', methods: ['GET'])]
    public function testError400(): JsonResponse
    {
        throw new BadRequestHttpException('Invalid JSON.');
    }
}
