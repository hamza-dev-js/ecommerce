const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true
}));

// Middleware
app.use(express.json());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    message: 'API route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: /api/health`);
  console.log(`🛍️ Products API: /api/products`);
  console.log(`🔐 Auth API: /api/auth`);
});