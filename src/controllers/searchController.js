const Article = require('../models/Article');

// Search articles by name and category
const searchArticles = async (req, res) => {
  try {
    const { q, category } = req.query;
    
    // Validate search parameters
    if (!q && !category) {
      return res.status(400).json({ 
        message: 'Search query or category is required' 
      });
    }
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const articleModel = new Article(supabase);
    
    // Build filters
    const filters = {};
    if (category && category !== 'Tous') {
      filters.category = category;
    }
    if (q) {
      filters.search = q;
    }
    
    // Search articles
    const articles = await articleModel.list(filters);
    
    res.json({ articles });
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({ 
      message: 'Error searching articles',
      error: error.message 
    });
  }
};

module.exports = {
  searchArticles
};