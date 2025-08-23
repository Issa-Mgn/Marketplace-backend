const Order = require('../models/Order');
const Article = require('../models/Article');
const User = require('../models/User');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const orderModel = new Order(supabase);
    const articleModel = new Article(supabase);
    
    // Verify article exists
    const article = await articleModel.getById(articleId);
    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // Create order data
    const orderData = {
      articleId,
      articleName: article.name,
      articlePrice: article.price
    };
    
    // Create the order
    const order = await orderModel.createOrder(userId, articleId, article.name, article.price);
    
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      message: 'Error creating order',
      error: error.message 
    });
  }
};

// Get user's order history
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const orderModel = new Order(supabase);
    
    // Get user's orders
    const orders = await orderModel.getUserOrders(userId);
    
    res.json({ orders });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ 
      message: 'Error getting orders',
      error: error.message 
    });
  }
};

// Delete user's order history
const deleteUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const orderModel = new Order(supabase);
    
    // Delete user's orders
    await orderModel.deleteUserOrders(userId);
    
    res.json({ 
      message: 'Order history deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting orders:', error);
    res.status(500).json({ 
      message: 'Error deleting orders',
      error: error.message 
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  deleteUserOrders
};