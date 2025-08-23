const Article = require('../models/Article');
const User = require('../models/User');

// Create a new article
const createArticle = async (req, res) => {
  try {
    const { name, category, price, description, whatsappNumber, additionalDetails, imageUrls } = req.body;
    
    // Validate required fields
    if (!name || !category || !price || !whatsappNumber) {
      return res.status(400).json({ 
        message: 'Name, category, price, and WhatsApp number are required' 
      });
    }
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const articleModel = new Article(supabase);
    
    // Create article data
    const articleData = {
      name,
      category,
      price: price, // Garder le prix comme chaîne de caractères
      description: description || '',
      whatsapp_number: whatsappNumber,
      additional_details: additionalDetails || '',
      image_urls: imageUrls || []
    };
    
    // Create the article
    const article = await articleModel.create(articleData);
    
    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ 
      message: 'Error creating article',
      error: error.message 
    });
  }
};

// Get an article by ID
const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const articleModel = new Article(supabase);
    
    // Get the article
    const article = await articleModel.getById(id);
    
    if (!article) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    res.json({ article });
  } catch (error) {
    console.error('Error getting article:', error);
    res.status(500).json({ 
      message: 'Error getting article',
      error: error.message 
    });
  }
};

// Update an article
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, whatsappNumber, additionalDetails, imageUrls } = req.body;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const articleModel = new Article(supabase);
    
    // Verify article exists and get owner
    const existingArticle = await articleModel.getById(id);
    if (!existingArticle) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // For now, we'll allow anyone to update (in a real app, you'd check ownership)
    // In a later implementation, we'll verify the user is the owner
    
    // Update article data
    const updates = {};
    if (name) updates.name = name;
    if (category) updates.category = category;
    if (price) updates.price = price; // Garder le prix comme chaîne de caractères
    if (description !== undefined) updates.description = description;
    if (whatsappNumber) updates.whatsapp_number = whatsappNumber;
    if (additionalDetails !== undefined) updates.additional_details = additionalDetails;
    if (imageUrls) updates.image_urls = imageUrls;
    
    // Update the article
    const updatedArticle = await articleModel.update(id, updates);
    
    res.json({
      message: 'Article updated successfully',
      article: updatedArticle
    });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ 
      message: 'Error updating article',
      error: error.message 
    });
  }
};

// Delete an article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const articleModel = new Article(supabase);
    
    // Verify article exists
    const existingArticle = await articleModel.getById(id);
    if (!existingArticle) {
      return res.status(404).json({ 
        message: 'Article not found' 
      });
    }
    
    // For now, we'll allow anyone to delete (in a real app, you'd check ownership)
    // In a later implementation, we'll verify the user is the owner
    
    // Delete the article
    await articleModel.delete(id);
    
    res.json({ 
      message: 'Article deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ 
      message: 'Error deleting article',
      error: error.message 
    });
  }
};

// List articles with optional filters
const listArticles = async (req, res) => {
  try {
    const { category, search } = req.query;
    
    // Initialize Supabase client
    const supabase = req.app.get('supabase');
    const articleModel = new Article(supabase);
    
    // Build filters
    const filters = {};
    if (category && category !== 'Tous') {
      filters.category = category;
    }
    if (search) {
      filters.search = search;
    }
    
    // Get articles
    const articles = await articleModel.list(filters);
    
    res.json({ articles });
  } catch (error) {
    console.error('Error listing articles:', error);
    res.status(500).json({ 
      message: 'Error listing articles',
      error: error.message 
    });
  }
};

module.exports = {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  listArticles
};