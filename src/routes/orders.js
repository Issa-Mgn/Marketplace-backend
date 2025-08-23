const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { identifyUser } = require('../middleware/auth');

// Apply user identification middleware to all routes
router.use(identifyUser);

// Order routes
router.post('/:articleId', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.delete('/', orderController.deleteUserOrders);

module.exports = router;