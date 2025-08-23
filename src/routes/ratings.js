const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { identifyUser } = require('../middleware/auth');

// Apply user identification middleware to all routes
router.use(identifyUser);

// Rating routes
router.post('/:articleId', ratingController.rateArticle);
router.get('/:articleId', ratingController.getArticleRatings);
router.get('/:articleId/user', ratingController.getUserRating);

module.exports = router;