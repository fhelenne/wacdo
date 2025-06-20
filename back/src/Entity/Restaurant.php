<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RestaurantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: RestaurantRepository::class)]
#[ApiResource]
class Restaurant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['restaurant','assignments'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user','restaurant','assignments'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['restaurant','assignments'])]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups(['restaurant','assignments'])]
    private ?string $zipCode = null;

    #[ORM\Column(length: 255)]
    #[Groups(['restaurant','assignments'])]
    private ?string $city = null;

    /**
     * @var Collection<int, Assignment>
     */
    #[ORM\OneToMany(targetEntity: Assignment::class, mappedBy: 'restaurant', orphanRemoval: true)]
    #[Groups(['restaurant'])]
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

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
            $assignment->setRestaurant($this);
        }

        return $this;
    }

    public function removeAssignment(Assignment $assignment): static
    {
        if ($this->assignments->removeElement($assignment)) {
            // set the owning side to null (unless already changed)
            if ($assignment->getRestaurant() === $this) {
                $assignment->setRestaurant(null);
            }
        }

        return $this;
    }

}
