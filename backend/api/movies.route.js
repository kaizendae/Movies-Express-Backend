import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";
const router = express.Router(); // Create a router

router.route("/").get(MoviesController.apiGetMovies); // Create a route
router.route("/review").post(ReviewsController.apiPostReview).put(ReviewsController.apiUpdateReview).delete(ReviewsController.apiDeleteReview) // Create a route
export default router; // Export the router
