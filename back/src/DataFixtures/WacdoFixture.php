<?php

namespace App\DataFixtures;

use App\Entity\Enum\Role;
use App\Entity\JobTitle;
use App\Entity\Restaurant;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class WacdoFixture extends Fixture
{

    public function __construct(private UserPasswordHasherInterface $userPassword )
    {
    }

    public function load(ObjectManager $manager): void
    {

        $user = new User();
        $user->setLastName('Marcheciel')
            ->setFirstName('Luc')
            ->setRoles(['ROLE_ADMIN','ROLE_EMPLOYEE'])
            ->setEmail('admin@wacdo.local')
            ->setPassword($this->userPassword->hashPassword( $user, 'admin123'))
            ->setFirstHiredAt(new \DateTimeImmutable('now -1month'))
        ;
        $manager->persist($user);

        $user1 = new User();
        $user1->setLastName('Smith')
            ->setFirstName('Mister')
            ->setRoles(['ROLE_EMPLOYEE'])
            ->setEmail('employee1@wacdo.local')
            ->setPassword($this->userPassword->hashPassword( $user, 'employee1'))
            ->setFirstHiredAt(new \DateTimeImmutable('now -1week'))
        ;
        $manager->persist($user1);

        $user2 = new User();
        $user2->setLastName('Toukour')
            ->setFirstName('Neo')
            ->setRoles(['ROLE_EMPLOYEE'])
            ->setEmail('employee2@wacdo.local')
            ->setPassword($this->userPassword->hashPassword( $user, 'employee2'))
            ->setFirstHiredAt(new \DateTimeImmutable('now -1day'))
        ;
        $manager->persist($user2);


        $jobTitle = new JobTitle();
        $jobTitle->setName('manager');
        $manager->persist($jobTitle);

        $jobTitle1 = new JobTitle();
        $jobTitle1->setName('cook');
        $manager->persist($jobTitle1);

        $jobTitle2 = new JobTitle();
        $jobTitle2->setName('cleaner');
        $manager->persist($jobTitle2);

        $restaurant1 = new Restaurant();
        $restaurant1->setName('wacdo poitiers')
            ->setCity('Poitiers')
            ->setAddress('rue Carnot')
            ->setZipCode('86000')
        ;
        $manager->persist($restaurant1);

        $restaurant2 = new Restaurant();
        $restaurant2->setName('wacdo niort')
            ->setCity('Niort')
            ->setAddress('rue de la gare')
            ->setZipCode('79000')
        ;
        $manager->persist($restaurant2);

        $manager->flush();
    }
}
