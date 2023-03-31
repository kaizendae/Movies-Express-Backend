import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
async function main() {
    dotenv.config();
    const uri = process.env.MOVIEREVIEWS_DB_URI;
    const client = new mongodb.MongoClient(uri);
    const port = process.env.PORT || 8000;
    try {
        // Connect to the MongoDB cluster
        console.log("Connecting to MongoDB...")
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        console.log("Connected to MongoDB!")
        // Launch the server
        await app.listen(port, () => { console.log(`Listening on port ${port}`); });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);
