<?php

namespace App\Tests\Entity;

use App\Entity\Assignment;
use App\Entity\JobTitle;
use App\Entity\Restaurant;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class AssignmentTest extends TestCase
{
    private Assignment $assignment;

    protected function setUp(): void
    {
        $this->assignment = new Assignment();
    }

    public function testGetId(): void
    {
        // ID is null by default for a new entity
        $this->assertNull($this->assignment->getId());
    }

    public function testStartAt(): void
    {
        $date = new \DateTimeImmutable();
        $this->assertNull($this->assignment->getStartAt());
        
        $result = $this->assignment->setStartAt($date);
        $this->assertSame($this->assignment, $result);
        $this->assertSame($date, $this->assignment->getStartAt());
    }

    public function testEndAt(): void
    {
        $date = new \DateTimeImmutable();
        $this->assertNull($this->assignment->getEndAt());
        
        $result = $this->assignment->setEndAt($date);
        $this->assertSame($this->assignment, $result);
        $this->assertSame($date, $this->assignment->getEndAt());
    }

    public function testUser(): void
    {
        $user = new User();
        $this->assertNull($this->assignment->getUser());
        
        $result = $this->assignment->setUser($user);
        $this->assertSame($this->assignment, $result);
        $this->assertSame($user, $this->assignment->getUser());
    }

    public function testJobTitle(): void
    {
        $jobTitle = new JobTitle();
        $this->assertNull($this->assignment->getJobTitle());
        
        $result = $this->assignment->setJobTitle($jobTitle);
        $this->assertSame($this->assignment, $result);
        $this->assertSame($jobTitle, $this->assignment->getJobTitle());
    }

    public function testRestaurant(): void
    {
        $restaurant = new Restaurant();
        $this->assertNull($this->assignment->getRestaurant());
        
        $result = $this->assignment->setRestaurant($restaurant);
        $this->assertSame($this->assignment, $result);
        $this->assertSame($restaurant, $this->assignment->getRestaurant());
    }
}