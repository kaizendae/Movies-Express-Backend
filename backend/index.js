import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import MoviesDAO from "./dao/moviesDAO.js";
async function main() {
    dotenv.config();
    const uri = process.env.MOVIEREVIEWS_DB_URI;
    const client = new mongodb.MongoClient(uri);
    const port = process.env.PORT || 8000;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client);

        // Launch the server
        await app.listen(port, () => { console.log(`Listening on port ${port}`); });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);
