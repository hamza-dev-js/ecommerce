const express = require('express');
const router = express.Router();

// Import product controller functions
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} = require('../controllers/productController');

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/search/:query
 * @desc    Search products by name or description
 * @access  Public
 */
router.get('/search/:query', searchProducts);

/**
 * @route   GET /api/products/category/:category
 * @desc    Get products by category
 * @access  Public
 */
router.get('/category/:category', getProductsByCategory);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public
 */
router.post('/', createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 * @access  Public
 */
router.put('/:id', updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID
 * @access  Public
 */
router.delete('/:id', deleteProduct);

// Export router for use in main server file
module.exports = router;