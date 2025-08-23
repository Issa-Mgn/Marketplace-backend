const { v4: uuidv4 } = require('uuid');

// Middleware to identify anonymous users
const identifyUser = (req, res, next) => {
  // Check if user ID is provided in headers
  let userId = req.headers['x-user-id'];
  
  // If no user ID provided, generate a new one
  if (!userId) {
    userId = uuidv4();
    // Send the new user ID back in response headers
    res.setHeader('X-User-Id', userId);
  }
  
  // Attach user ID to request object
  req.userId = userId;
  next();
};

module.exports = {
  identifyUser
};