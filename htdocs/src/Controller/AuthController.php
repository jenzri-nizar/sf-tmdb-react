<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthController extends AbstractController
{
    #[Route('/api/login_check', name: 'ogin-check', methods: ["POST"])]
    public function getTokenUser( JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        if ($this->getUser()){
            return new JsonResponse(['token' => $JWTManager->create($this->getUser())]);
        }
        return new JsonResponse([], 400);
    }
}
