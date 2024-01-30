<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $userPasswordHasher)
    {

    }
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $user = new User();

        $user->setEmail("test@sf.com");

        $user->setRoles(['user']);
        $user->setPassword($this->userPasswordHasher->hashPassword($user, "root@127"));
        $manager->persist($user);
        $manager->flush();
    }
}
