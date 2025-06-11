<?php

namespace App\Entity;

use App\Entity\Enum\Role;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user','assignments'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user','assignments'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user','assignments'])]
    private ?string $first_name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user','assignments'])]
    private ?string $email = null;

    #[ORM\Column(length: 255,nullable: true)]
    #[Ignore]
    private ?string $password = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user'])]
    private ?\DateTimeImmutable $first_hired_at = null;

    #[ORM\Column(enumType: Role::class)]
    #[Groups(['user','assignments'])]
    private ?Role $role = null;

    /**
     * @var Collection<int, Assignment>
     */
    #[ORM\OneToMany(targetEntity: Assignment::class, mappedBy: 'user', orphanRemoval: true)]
    #[Groups(['user'])]
    private Collection $assignments;


    public function __construct()
    {
        $this->assignments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): static
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    #[Ignore]
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getFirstHiredAt(): ?\DateTimeImmutable
    {
        return $this->first_hired_at;
    }

    public function setFirstHiredAt(\DateTimeImmutable $first_hired_at): static
    {
        $this->first_hired_at = $first_hired_at;

        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(Role $role): static
    {
        $this->role = $role;

        return $this;
    }

    /**
     * @return Collection<int, Assignment>
     */
    public function getAssignments(): Collection
    {
        return $this->assignments;
    }

    public function addAssignment(Assignment $assignment): static
    {
        if (!$this->assignments->contains($assignment)) {
            $this->assignments->add($assignment);
            $assignment->setUser($this);
        }

        return $this;
    }

    public function removeAssignment(Assignment $assignment): static
    {
        if ($this->assignments->removeElement($assignment)) {
            // set the owning side to null (unless already changed)
            if ($assignment->getUser() === $this) {
                $assignment->setUser(null);
            }
        }

        return $this;
    }
}
