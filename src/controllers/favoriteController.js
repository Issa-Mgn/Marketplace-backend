const Favorite = require('../models/Favorite');
const Article = require('../models/Article');
const User = require('../models/User');

// Add an article to user's favorites
const addFavorite = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const favoriteModel = new Favorite(supabase);
    const articleModel = new Article(supabase);
    
    // Verify article exists
    const article = await articleModel.getById(articleId);
    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // Add to favorites
    const favorite = await favoriteModel.addFavorite(userId, articleId);
    
    res.status(201).json({
      message: 'Article added to favorites',
      favorite
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ 
        message: 'Article is already in favorites' 
      });
    }
    res.status(500).json({ 
      message: 'Error adding favorite',
      error: error.message 
    });
  }
};

// Remove an article from user's favorites
const removeFavorite = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const favoriteModel = new Favorite(supabase);
    
    // Remove from favorites
    await favoriteModel.removeFavorite(userId, articleId);
    
    res.json({ 
      message: 'Article removed from favorites' 
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ 
      message: 'Error removing favorite',
      error: error.message 
    });
  }
};

// Get user's favorite articles
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const favoriteModel = new Favorite(supabase);
    
    // Get user's favorites
    const favorites = await favoriteModel.getUserFavorites(userId);
    
    // Extract articles from favorites
    const articles = favorites.map(fav => ({
      id: fav.articles.id,
      name: fav.articles.name,
      price: fav.articles.price,
      image_urls: fav.articles.image_urls
    }));
    
    res.json({ articles });
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ 
      message: 'Error getting favorites',
      error: error.message 
    });
  }
};

// Check if an article is in user's favorites
const isFavorite = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const favoriteModel = new Favorite(supabase);
    
    // Check if favorite
    const isFav = await favoriteModel.isFavorite(userId, articleId);
    
    res.json({ isFavorite: isFav });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ 
      message: 'Error checking favorite',
      error: error.message 
    });
  }
};

// Remove all favorites for a user
const removeAllFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const favoriteModel = new Favorite(supabase);
    
    // Remove all favorites
    await favoriteModel.removeAllFavorites(userId);
    
    res.json({ 
      message: 'All favorites removed successfully' 
    });
  } catch (error) {
    console.error('Error removing all favorites:', error);
    res.status(500).json({ 
      message: 'Error removing all favorites',
      error: error.message 
    });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites,
  isFavorite,
  removeAllFavorites
};