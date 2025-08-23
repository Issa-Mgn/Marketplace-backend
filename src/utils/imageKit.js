const ImageKit = require('imagekit');

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Upload an image to ImageKit
const uploadImage = async (file, fileName, folder) => {
  try {
    // Convert file to base64 if it's a buffer
    let fileData = file;
    if (file.buffer) {
      fileData = file.buffer.toString('base64');
    }
    
    // Upload file to ImageKit
    const result = await imagekit.upload({
      file: fileData,
      fileName: fileName,
      folder: folder
    });
    
    return {
      url: result.url,
      fileId: result.fileId
    };
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Delete an image from ImageKit
const deleteImage = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    throw new Error(`Image deletion failed: ${error.message}`);
  }
};

module.exports = {
  uploadImage,
  deleteImage
};