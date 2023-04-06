import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";
const router = express.Router(); // Create a router

router.route("/").get(MoviesController.apiGetMovies); // Create a route
router.route("/review").post(ReviewsController.apiPostReview).put(ReviewsController.apiUpdateReview).delete(ReviewsController.apiDeleteReview) // Create a route
// retrieves a specific movie with its reviews by its ID
router.route("/id/:id").get(MoviesController.apiGetMovieById);
// return a list of movies with a specific genre e.g. G or PG or R.
router.route("/ratings").get(MoviesController.apiGetRatings);

export default router; // Export the router
