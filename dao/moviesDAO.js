import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

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

    static async getMovieByID(id) {
        try {
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "movie_id",
                        as: "reviews",
                    }
                }
            ]).next();
        }catch (e) {
            console.error(`Something went wrong in getMovieByID: ${e}`);
            throw e;
        }
    }

    static async getRatings() {
        let ratings = [];
        try {
            ratings = await movies.distinct("rated");
            console.log("ratings", ratings);
            return ratings;
        } catch (e) {
            console.error(`Unable to get ratings, ${e}`);
            return ratings;
        }
    }
}
