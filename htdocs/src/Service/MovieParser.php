<?php

namespace App\Service;

use Tmdb\Client;

class MovieParser
{
    private Client $client;

    // Have Symfony auto-wire the client via your constructor
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getGenres()
    {
        // Utilisez le client TMDb pour obtenir les genres de films
        $genres = $this->client->getGenresApi()->getMovieGenres();

        return $genres;
    }

    public function getByGenre($genreId)
    {
        // Utilisez le client TMDb pour obtenir les films par genre
        $movies = $this->client->getDiscoverApi()->discoverMovies(['with_genres' => $genreId]);

        return $movies['results'];
    }

    public function getDetail($movieId)
    {
        try {
            // Utilisez le client TMDb pour obtenir les détails d'un film
            return $this->client->getMoviesApi()->getMovie($movieId);
        } catch (\Exception $e) {
            return null;
        }

    }

    public function getTop()
    {
        // Utilisez le client TMDb pour obtenir les meilleurs films
        $topRatedMovies = $this->client->getMoviesApi()->getTopRated();

        return $topRatedMovies['results'];
    }

    public function search($query)
    {
        // Utilisez le client TMDb pour effectuer une recherche de films
        $searchResults = $this->client->getSearchApi()->searchMovies($query);

        return $searchResults['results'];
    }
}
