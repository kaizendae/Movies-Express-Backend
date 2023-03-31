import reviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }
            const date = new Date()
            console.log(req.body)
            const ReviewResponse = await reviewsDAO.addReview(
                userInfo,
                movieId,
                review,
                date,
            )

            res.json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const review = req.body.review
            const date = new Date()

            const reviewResponse = await reviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    'unable to update review - user may not be original poster',
                )
            }

            res.json({ status: 'success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            console.log(`Delete review ${reviewId} by user ${userId}`)
            const reviewResponse = await reviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: 'success', message: reviewResponse.deletedCount })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}

