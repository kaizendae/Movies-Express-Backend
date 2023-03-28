import express from "express";
import MoviesController from "./movies.controller.js";

const router = express.Router(); // Create a router

router.route("/").get(MoviesController.apiGetMovies); // Create a route

export default router; // Export the router
