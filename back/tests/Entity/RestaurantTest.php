<?php

namespace App\Tests\Entity;

use App\Entity\Assignment;
use App\Entity\Restaurant;
use Doctrine\Common\Collections\ArrayCollection;
use PHPUnit\Framework\TestCase;

class RestaurantTest extends TestCase
{
    private Restaurant $restaurant;

    protected function setUp(): void
    {
        $this->restaurant = new Restaurant();
    }

    public function testGetId(): void
    {
        // ID is null by default for a new entity
        $this->assertNull($this->restaurant->getId());
    }

    public function testName(): void
    {
        $name = 'Restaurant Name';
        $this->assertNull($this->restaurant->getName());
        
        $result = $this->restaurant->setName($name);
        $this->assertSame($this->restaurant, $result);
        $this->assertSame($name, $this->restaurant->getName());
    }

    public function testAddress(): void
    {
        $address = '123 Main St';
        $this->assertNull($this->restaurant->getAddress());
        
        $result = $this->restaurant->setAddress($address);
        $this->assertSame($this->restaurant, $result);
        $this->assertSame($address, $this->restaurant->getAddress());
    }

    public function testZipCode(): void
    {
        $zipCode = '12345';
        $this->assertNull($this->restaurant->getZipCode());
        
        $result = $this->restaurant->setZipCode($zipCode);
        $this->assertSame($this->restaurant, $result);
        $this->assertSame($zipCode, $this->restaurant->getZipCode());
    }

    public function testCity(): void
    {
        $city = 'Paris';
        $this->assertNull($this->restaurant->getCity());
        
        $result = $this->restaurant->setCity($city);
        $this->assertSame($this->restaurant, $result);
        $this->assertSame($city, $this->restaurant->getCity());
    }

    public function testAssignments(): void
    {
        // Test that assignments is initialized as an empty collection
        $this->assertInstanceOf(ArrayCollection::class, $this->restaurant->getAssignments());
        $this->assertCount(0, $this->restaurant->getAssignments());
    }

    public function testAddAssignment(): void
    {
        $assignment = new Assignment();
        
        $result = $this->restaurant->addAssignment($assignment);
        $this->assertSame($this->restaurant, $result);
        $this->assertCount(1, $this->restaurant->getAssignments());
        $this->assertTrue($this->restaurant->getAssignments()->contains($assignment));
        $this->assertSame($this->restaurant, $assignment->getRestaurant());
    }

    public function testRemoveAssignment(): void
    {
        $assignment = new Assignment();
        $assignment->setRestaurant($this->restaurant);
        $this->restaurant->addAssignment($assignment);
        
        $result = $this->restaurant->removeAssignment($assignment);
        $this->assertSame($this->restaurant, $result);
        $this->assertCount(0, $this->restaurant->getAssignments());
        $this->assertFalse($this->restaurant->getAssignments()->contains($assignment));
    }
}