<?php

namespace App\Tests\Controller;

final class RestaurantController extends BaseController
{
    public function testIndex(): void
    {
        $client = $this->getAuthenticatedClient();
        $client->request('GET', '/api/restaurants');

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
