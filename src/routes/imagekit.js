const express = require('express');
const router = express.Router();
const { getImageKitAuth } = require('../controllers/imagekitController');

router.get('/imagekit-auth', getImageKitAuth);

module.exports = router;