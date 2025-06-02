<?php

namespace App\Entity;

use App\Repository\AssignmentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AssignmentRepository::class)]
class Assignment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $start_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $end_at = null;

    #[ORM\ManyToOne(inversedBy: 'assignments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'assignments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?JobTitle $job_title = null;

    #[ORM\ManyToOne(inversedBy: 'assignments')]
    #[ORM\JoinColumn(nullable: false)]
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
        return $this->start_at;
    }

    public function setStartAt(\DateTimeImmutable $start_at): static
    {
        $this->start_at = $start_at;

        return $this;
    }

    public function getEndAt(): ?\DateTimeImmutable
    {
        return $this->end_at;
    }

    public function setEndAt(?\DateTimeImmutable $end_at): static
    {
        $this->end_at = $end_at;

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
        return $this->job_title;
    }

    public function setJobTitle(?JobTitle $job_title): static
    {
        $this->job_title = $job_title;

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
