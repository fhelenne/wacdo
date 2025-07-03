<?php

namespace App\Tests\Entity;

use App\Entity\Assignment;
use App\Entity\JobTitle;
use Doctrine\Common\Collections\ArrayCollection;
use PHPUnit\Framework\TestCase;

class JobTitleTest extends TestCase
{
    private JobTitle $jobTitle;

    protected function setUp(): void
    {
        $this->jobTitle = new JobTitle();
    }

    public function testGetId(): void
    {
        // ID is null by default for a new entity
        $this->assertNull($this->jobTitle->getId());
    }

    public function testName(): void
    {
        $name = 'Chef';
        $this->assertNull($this->jobTitle->getName());
        
        $result = $this->jobTitle->setName($name);
        $this->assertSame($this->jobTitle, $result);
        $this->assertSame($name, $this->jobTitle->getName());
    }

    public function testAssignments(): void
    {
        // Test that assignments is initialized as an empty collection
        $this->assertInstanceOf(ArrayCollection::class, $this->jobTitle->getAssignments());
        $this->assertCount(0, $this->jobTitle->getAssignments());
    }

    public function testAddAssignment(): void
    {
        $assignment = new Assignment();
        
        $result = $this->jobTitle->addAssignment($assignment);
        $this->assertSame($this->jobTitle, $result);
        $this->assertCount(1, $this->jobTitle->getAssignments());
        $this->assertTrue($this->jobTitle->getAssignments()->contains($assignment));
        $this->assertSame($this->jobTitle, $assignment->getJobTitle());
    }

    public function testRemoveAssignment(): void
    {
        $assignment = new Assignment();
        $assignment->setJobTitle($this->jobTitle);
        $this->jobTitle->addAssignment($assignment);
        
        $result = $this->jobTitle->removeAssignment($assignment);
        $this->assertSame($this->jobTitle, $result);
        $this->assertCount(0, $this->jobTitle->getAssignments());
        $this->assertFalse($this->jobTitle->getAssignments()->contains($assignment));
    }
}