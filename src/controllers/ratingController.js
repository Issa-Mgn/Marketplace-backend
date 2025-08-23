const Rating = require('../models/Rating');
const Article = require('../models/Article');
const User = require('../models/User');

// Rate an article
const rateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { rating } = req.body;
    const userId = req.userId;
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        message: 'Rating must be between 1 and 5' 
      });
    }
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const ratingModel = new Rating(supabase);
    const articleModel = new Article(supabase);
    
    // Verify article exists
    const article = await articleModel.getById(articleId);
    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // Rate the article
    const ratingResult = await ratingModel.rateArticle(userId, articleId, rating);
    
    res.status(201).json({
      message: 'Article rated successfully',
      rating: ratingResult
    });
  } catch (error) {
    console.error('Error rating article:', error);
    res.status(500).json({ 
      message: 'Error rating article',
      error: error.message 
    });
  }
};

// Get article ratings
const getArticleRatings = async (req, res) => {
  try {
    const { articleId } = req.params;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const ratingModel = new Rating(supabase);
    const articleModel = new Article(supabase);
    
    // Verify article exists
    const article = await articleModel.getById(articleId);
    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // Get ratings
    const ratings = await ratingModel.getArticleRatings(articleId);
    
    res.json({ ratings });
  } catch (error) {
    console.error('Error getting ratings:', error);
    res.status(500).json({ 
      message: 'Error getting ratings',
      error: error.message 
    });
  }
};

// Get user's rating for an article
const getUserRating = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.userId;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const ratingModel = new Rating(supabase);
    const articleModel = new Article(supabase);
    
    // Verify article exists
    const article = await articleModel.getById(articleId);
    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // Get user's rating
    const userRating = await ratingModel.getUserRating(userId, articleId);
    
    res.json({ rating: userRating });
  } catch (error) {
    console.error('Error getting user rating:', error);
    res.status(500).json({ 
      message: 'Error getting user rating',
      error: error.message 
    });
  }
};

module.exports = {
  rateArticle,
  getArticleRatings,
  getUserRating
};