const db = require('../config/db');

/**
 * Convert database results to proper JavaScript types
 */
const formatProduct = (product) => {
  return {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock)
  };
};

/**
 * Get all products from database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllProducts = (req, res) => {
  const sql = 'SELECT * FROM products ORDER BY id DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err.message);
      return res.status(500).json({ 
        message: 'Error fetching products from database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Convert prices and stock to numbers
    const formattedProducts = results.map(formatProduct);
    
    console.log(`✅ Retrieved ${formattedProducts.length} products successfully`);
    res.json(formattedProducts);
  });
};

/**
 * Get single product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProductById = (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  
  // Validate product ID
  if (isNaN(productId)) {
    return res.status(400).json({ 
      message: 'Invalid product ID format' 
    });
  }
  
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error(`❌ Error fetching product ${productId}:`, err.message);
      return res.status(500).json({ 
        message: 'Error fetching product from database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ 
        message: 'Product not found',
        productId: productId
      });
    }
    
    // Convert data to correct types
    const formattedProduct = formatProduct(results[0]);
    
    console.log(`✅ Retrieved product ${productId} successfully`);
    res.json(formattedProduct);
  });
};

/**
 * Create a new product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createProduct = (req, res) => {
  const { name, description, price, image, category, stock } = req.body;
  
  // Validate required fields
  if (!name || !description || !price || !image || !category || stock === undefined) {
    return res.status(400).json({ 
      message: 'All fields are required: name, description, price, image, category, stock'
    });
  }
  
  // Validate price and stock are numbers
  if (isNaN(price) || isNaN(stock)) {
    return res.status(400).json({ 
      message: 'Price and stock must be valid numbers'
    });
  }
  
  // Convert to numbers to ensure correctness
  const priceNum = Number(price);
  const stockNum = Number(stock);
  
  const sql = 'INSERT INTO products (name, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [name, description, priceNum, image, category, stockNum], (err, results) => {
    if (err) {
      console.error('❌ Error creating product:', err.message);
      return res.status(500).json({ 
        message: 'Error creating product in database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    console.log(`✅ Product created successfully with ID: ${results.insertId}`);
    res.status(201).json({ 
      id: results.insertId, 
      name, 
      description, 
      price: priceNum, 
      image, 
      category, 
      stock: stockNum,
      message: 'Product created successfully'
    });
  });
};

/**
 * Update an existing product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price, image, category, stock } = req.body;
  
  // Validate product ID
  if (isNaN(productId)) {
    return res.status(400).json({ 
      message: 'Invalid product ID format' 
    });
  }
  
  // Validate required fields
  if (!name || !description || !price || !image || !category || stock === undefined) {
    return res.status(400).json({ 
      message: 'All fields are required: name, description, price, image, category, stock'
    });
  }
  
  // Convert to numbers to ensure correctness
  const priceNum = Number(price);
  const stockNum = Number(stock);
  
  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ? WHERE id = ?';
  
  db.query(sql, [name, description, priceNum, image, category, stockNum, productId], (err, results) => {
    if (err) {
      console.error(`❌ Error updating product ${productId}:`, err.message);
      return res.status(500).json({ 
        message: 'Error updating product in database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'Product not found',
        productId: productId
      });
    }
    
    console.log(`✅ Product ${productId} updated successfully`);
    res.json({ 
      message: 'Product updated successfully',
      productId: productId,
      affectedRows: results.affectedRows
    });
  });
};

/**
 * Delete a product by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteProduct = (req, res) => {
  const productId = req.params.id;
  
  // Validate product ID
  if (isNaN(productId)) {
    return res.status(400).json({ 
      message: 'Invalid product ID format' 
    });
  }
  
  const sql = 'DELETE FROM products WHERE id = ?';
  
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error(`❌ Error deleting product ${productId}:`, err.message);
      return res.status(500).json({ 
        message: 'Error deleting product from database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'Product not found',
        productId: productId
      });
    }
    
    console.log(`✅ Product ${productId} deleted successfully`);
    res.json({ 
      message: 'Product deleted successfully',
      productId: productId,
      affectedRows: results.affectedRows
    });
  });
};

/**
 * Search products by name or description
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchProducts = (req, res) => {
  const searchQuery = `%${req.params.query}%`;
  const sql = 'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY name';
  
  db.query(sql, [searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error('❌ Error searching products:', err.message);
      return res.status(500).json({ 
        message: 'Error searching products in database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Convert prices and stock to numbers
    const formattedProducts = results.map(formatProduct);
    
    console.log(`✅ Found ${formattedProducts.length} products matching: ${req.params.query}`);
    res.json(formattedProducts);
  });
};

/**
 * Get products by category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProductsByCategory = (req, res) => {
  const category = req.params.category;
  const sql = 'SELECT * FROM products WHERE category = ? ORDER BY name';
  
  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error(`❌ Error fetching products for category ${category}:`, err.message);
      return res.status(500).json({ 
        message: 'Error fetching products by category from database',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
    
    // Convert prices and stock to numbers
    const formattedProducts = results.map(formatProduct);
    
    console.log(`✅ Retrieved ${formattedProducts.length} products in category: ${category}`);
    res.json(formattedProducts);
  });
};

// Export all controller functions
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
};