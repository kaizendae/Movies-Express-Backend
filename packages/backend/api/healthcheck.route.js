import express from "express";
import mongodb from "mongodb";
const router = express.Router(); // Create a router

router.get('/', async (_req, res, _next) => {
    // try connecting to db
    const uri = process.env.MOVIEREVIEWS_DB_URI;
    const client = new mongodb.MongoClient(uri, { serverSelectionTimeoutMS: 500 });
    let dbState = "__"
    let status = 200
    let message = "OK"
    try {
        await client.connect();
        await client.close();
        dbState = "UP"
        status = 200
    } catch (e) {
        dbState = "DOWN"
        status = 503
        message = e.message
    }
    const healthcheck = {
        uptime: process.uptime(),
        database: dbState,
        timestamp: Date.now(),
        message: message
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(status).send();
    }
});

export default router;
