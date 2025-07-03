<?php

namespace App\Tests\Entity;

use App\Entity\Assignment;
use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    private User $user;

    protected function setUp(): void
    {
        $this->user = new User();
    }

    public function testGetId(): void
    {
        // ID is null by default for a new entity
        $this->assertNull($this->user->getId());
    }

    public function testEmail(): void
    {
        $email = 'test@example.com';
        $this->assertNull($this->user->getEmail());

        $result = $this->user->setEmail($email);
        $this->assertSame($this->user, $result);
        $this->assertSame($email, $this->user->getEmail());
    }

    public function testPassword(): void
    {
        $password = 'password123';

        $result = $this->user->setPassword($password);
        $this->assertSame($this->user, $result);
        $this->assertSame($password, $this->user->getPassword());
    }

    public function testPlainPassword(): void
    {
        $plainPassword = 'plainPassword123';
        $this->assertNull($this->user->getPlainPassword());

        $result = $this->user->setPlainPassword($plainPassword);
        $this->assertSame($this->user, $result);
        $this->assertSame($plainPassword, $this->user->getPlainPassword());
    }

    public function testRoles(): void
    {
        // Default roles should include ROLE_USER
        $this->assertContains('ROLE_USER', $this->user->getRoles());

        $roles = ['ROLE_ADMIN', 'ROLE_USER'];
        $result = $this->user->setRoles($roles);
        $this->assertSame($this->user, $result);
        $this->assertSame($roles, $this->user->getRoles());
    }

    public function testUserIdentifier(): void
    {
        $email = 'test@example.com';
        $this->user->setEmail($email);

        $this->assertSame($email, $this->user->getUserIdentifier());
    }

    public function testEraseCredentials(): void
    {
        $this->user->setPlainPassword('password123');
        $this->user->eraseCredentials();

        $this->assertNull($this->user->getPlainPassword());
    }

    public function testFirstName(): void
    {
        $firstName = 'John';
        $this->assertNull($this->user->getFirstName());

        $result = $this->user->setFirstName($firstName);
        $this->assertSame($this->user, $result);
        $this->assertSame($firstName, $this->user->getFirstName());
    }

    public function testLastName(): void
    {
        $lastName = 'Doe';
        $this->assertNull($this->user->getLastName());

        $result = $this->user->setLastName($lastName);
        $this->assertSame($this->user, $result);
        $this->assertSame($lastName, $this->user->getLastName());
    }

    public function testFirstHiredAt(): void
    {
        $date = new \DateTimeImmutable();
        $this->assertNull($this->user->getFirstHiredAt());

        $result = $this->user->setFirstHiredAt($date);
        $this->assertSame($this->user, $result);
        $this->assertSame($date, $this->user->getFirstHiredAt());
    }

    public function testAssignments(): void
    {
        // Initialize assignments first since User entity doesn't have a constructor that does this
        $assignments = new ArrayCollection();
        $this->user->setAssignments($assignments);

        // Test that assignments is now set
        $this->assertInstanceOf(ArrayCollection::class, $this->user->getAssignments());
        $this->assertCount(0, $this->user->getAssignments());

        // Test setting assignments to a new collection
        $newAssignments = new ArrayCollection();
        $result = $this->user->setAssignments($newAssignments);
        $this->assertSame($this->user, $result);
        $this->assertSame($newAssignments, $this->user->getAssignments());
    }
}
