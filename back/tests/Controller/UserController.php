<?php

namespace App\Tests\Controller;

final class UserController extends BaseController
{
    public function testIndex(): void
    {
        $client = $this->getAuthenticatedClient();
        $client->request('GET', '/api/users');

        self::assertResponseIsSuccessful();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        static::ensureKernelShutdown();
    }

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();
        static::$kernel = null;
        static::$booted = false;
        static::$class = null;
    }
}
