require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js'); // Ajoute cette ligne
const imagekitRoutes = require('./src/routes/imagekit');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialisation du client Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
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
app.use('/api', imagekitRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server lancé sur le port ${PORT}`);
});

module.exports = app;