class MovieService {
    genres() {
        return APIPrivate.get("/movie/genres");
    }

    byGenre(id) {
        return APIPrivate.get("/movie/genres/"+id);
    }

    detail(id) {
        return APIPrivate.get("/movie/detail/"+id);
    }

    getTop() {
        return APIPrivate.get("/movie");
    }
    seacrh(query) {
        return APIPrivate.get("/search/"+query);
    }
}

export default new MovieService();
