const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { identifyUser } = require('../middleware/auth');

// Apply user identification middleware to all routes
router.use(identifyUser);

// Favorite routes
router.post('/:articleId', favoriteController.addFavorite);
router.delete('/:articleId', favoriteController.removeFavorite);
router.get('/', favoriteController.getUserFavorites);
router.get('/:articleId', favoriteController.isFavorite);
router.delete('/', favoriteController.removeAllFavorites);

module.exports = router;