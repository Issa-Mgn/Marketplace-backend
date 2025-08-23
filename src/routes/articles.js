const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { identifyUser } = require('../middleware/auth');

// Apply user identification middleware to all routes
router.use(identifyUser);

// Article routes
router.post('/', articleController.createArticle);
router.get('/', articleController.listArticles);
router.get('/:id', articleController.getArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;