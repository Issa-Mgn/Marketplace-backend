const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Make Supabase client available to all routes
app.set('supabase', supabase);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Marketplace Backend API' });
});

// API Routes
app.use('/api/articles', require('./src/routes/articles'));
app.use('/api/favorites', require('./src/routes/favorites'));
app.use('/api/search', require('./src/routes/search'));
app.use('/api/ratings', require('./src/routes/ratings'));
app.use('/api/orders', require('./src/routes/orders'));

// Start server
app.listen(PORT, () => {
  console.log(`Server lancé sur le port ${PORT}`);
});

module.exports = app;