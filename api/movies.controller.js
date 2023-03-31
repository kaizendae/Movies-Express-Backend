import moviesDAO from "../dao/moviesDAO.js";

export default class MoviesController {
    static async apiGetRatings(req, res, next) {
        try {
            let ratings = await moviesDAO.getRatings();
            if (!ratings) {
                console.log("No ratings found");
                res.status(404).json({error: "Not found"});
                return;
            }
            res.json(ratings);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    };
    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {};
            let movie = await moviesDAO.getMovieByID(id);
            if (!movie) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(movie);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    };
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.genre) {
            filters.genre = req.query.genre;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        const { moviesList, totalNumMovies } = await moviesDAO.getMovies({
            filters,
            page,
            moviesPerPage,
        });

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }
}
