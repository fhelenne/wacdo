<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\AssignmentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: AssignmentRepository::class)]
#[ApiResource(

    operations: [
        new GetCollection(),
        new Post(validationContext: ['groups' => ['assignment:create']]),
        new Get(),
        new Put(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['assignment:read']],
    denormalizationContext: ['groups' => ['assignment:create', 'assignment:update']],
)]
class Assignment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'assignment:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['restaurant:read', 'assignment:read', 'assignment:create'])]
    private ?\DateTimeImmutable $startAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:read', 'restaurant:read', 'assignment:read', 'assignment:create'])]
    private ?\DateTimeImmutable $endAt = null;

    #[ORM\ManyToOne(fetch: 'LAZY', inversedBy: 'assignments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['restaurant:read', 'assignment:read', 'assignment:create'])]
    #[SerializedName("employee")]
    private ?User $user = null;

    #[ORM\ManyToOne(fetch: 'LAZY', inversedBy: 'assignments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['assignment:read', 'assignment:create', 'restaurant:read'])]
    private ?JobTitle $jobTitle = null;

    #[ORM\ManyToOne(fetch: 'LAZY', inversedBy: 'assignments',)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['user:read', 'assignment:read', 'assignment:create'])]
    private ?Restaurant $restaurant = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAt(): ?\DateTimeImmutable
    {
        return $this->startAt;
    }

    public function setStartAt(\DateTimeImmutable $startAt): static
    {
        $this->startAt = $startAt;

        return $this;
    }

    public function getEndAt(): ?\DateTimeImmutable
    {
        return $this->endAt;
    }

    public function setEndAt(?\DateTimeImmutable $endAt): static
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getJobTitle(): ?JobTitle
    {
        return $this->jobTitle;
    }

    public function setJobTitle(?JobTitle $jobTitle): static
    {
        $this->jobTitle = $jobTitle;

        return $this;
    }

    public function getRestaurant(): ?Restaurant
    {
        return $this->restaurant;
    }

    public function setRestaurant(?Restaurant $restaurant): static
    {
        $this->restaurant = $restaurant;

        return $this;
    }
}
