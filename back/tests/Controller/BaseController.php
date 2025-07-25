<?php

namespace App\Tests\Controller;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Entity\User;
use App\Repository\UserRepository;

abstract class BaseController extends ApiTestCase
{
    protected function getAuthenticatedClient(): \ApiPlatform\Symfony\Bundle\Test\Client
    {
        static::bootKernel();
        $client = self::createClient();
        $container = self::getContainer();

        // Get Tole8admin user from repository
        $userRepository = $container->get(UserRepository::class);
        $user = $userRepository->findOneBy(['email' => 'admin@wacdo.local']);

        if (!$user) {
            throw new \Exception('Tole8admin user not found. Make sure fixtures are loaded.');
        }

        // Get JWT token
        $response = $client->request('POST', '/auth', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => 'admin@wacdo.local',
                'password' => 'admin123',
            ],
        ]);

        $json = $response->toArray();
        $token = $json['token'];

        // Set the authorization header for subsequent requests
        $client->setDefaultOptions([
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Content-Type' => 'application/json',
            ],
        ]);

        return $client;
    }
}
