const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { identifyUser } = require('../middleware/auth');

// Apply user identification middleware to all routes
router.use(identifyUser);

// Image routes
router.post('/upload', imageController.uploadImageController);
router.delete('/delete/:fileId', imageController.deleteImageController);

module.exports = router;