<?php

namespace App\Controller;

use App\Service\MovieParser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class MovieController extends AbstractController
{
    #[Route('/api/movie', name: 'top_movie')]
    public function getTop(MovieParser $movieParser): JsonResponse
    {
        return new JsonResponse($movieParser->getTop(), 200);
    }
    #[Route('/api/movie/genres', name: 'genres_movie')]
    public function genres(MovieParser $movieParser): JsonResponse
    {
        return new JsonResponse($movieParser->getGenres(), 200);
    }

    #[Route('/api/movie/genres/{id}', name: 'movie_by_genre')]
    public function filmByGenre(MovieParser $movieParser, $id): JsonResponse
    {
        $movies = $movieParser->getByGenre($id);
        if (count($movies) === 0) {
            return new JsonResponse([], 404);
        }
        return new JsonResponse($movies, 200);
    }

    #[Route('/api/movie/detail/{id}', name: 'movie_detail')]
    public function getDetails(MovieParser $movieParser, $id): JsonResponse
    {
        $detail = $movieParser->getDetail($id);
        if (!$detail) {
            return new JsonResponse([], 404);
        }
        return new JsonResponse($detail, 200);
    }

    #[Route('/api/search/{query}', name: 'movie_search')]
    public function seacrh(MovieParser $movieParser, $query): JsonResponse
    {
        $detail = $movieParser->search($query);
        return new JsonResponse($detail, 200);
    }
}
