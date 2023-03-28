
let movies;

export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {
            return;
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in moviesDAO: ${e}`,
            );
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
                           }) {
        let query;
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters["title"] } };
            } else if ("genre" in filters) {
                query = { "genre": { $eq: filters["genre"] } };
            }
        }
        let cursor;
        try {
            cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return { moviesList, totalNumMovies };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }
}
