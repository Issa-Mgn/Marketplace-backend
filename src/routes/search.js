const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { identifyUser } = require('../middleware/auth');

// Apply user identification middleware to all routes
router.use(identifyUser);

// Search routes
router.get('/', searchController.searchArticles);

module.exports = router;