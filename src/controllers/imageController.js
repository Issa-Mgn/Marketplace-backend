const { uploadImage, deleteImage } = require('../utils/imageKit');

// Upload an image
const uploadImageController = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No file uploaded' 
      });
    }
    
    // Get folder from query params or use default
    const folder = req.query.folder || 'marketplace';
    
    // Generate file name
    const fileName = `${Date.now()}-${req.file.originalname}`;
    
    // Upload image to ImageKit
    const result = await uploadImage(req.file, fileName, folder);
    
    res.status(201).json({
      message: 'Image uploaded successfully',
      image: result
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      message: 'Error uploading image',
      error: error.message 
    });
  }
};

// Delete an image
const deleteImageController = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Delete image from ImageKit
    await deleteImage(fileId);
    
    res.json({ 
      message: 'Image deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ 
      message: 'Error deleting image',
      error: error.message 
    });
  }
};

module.exports = {
  uploadImageController,
  deleteImageController
};