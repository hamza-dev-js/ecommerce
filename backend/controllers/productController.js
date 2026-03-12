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
 * Get all products
 */
const getAllProducts = async (req, res) => {

  try {

    const sql = 'SELECT * FROM products ORDER BY id DESC';

    const result = await db.query(sql);

    const formattedProducts = result.rows.map(formatProduct);

    res.json(formattedProducts);

  } catch (err) {

    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });

  }

};


/**
 * Get product by ID
 */
const getProductById = async (req, res) => {

  try {

    const productId = req.params.id;

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const sql = 'SELECT * FROM products WHERE id = $1';

    const result = await db.query(sql, [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = formatProduct(result.rows[0]);

    res.json(product);

  } catch (err) {

    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error fetching product' });

  }

};


/**
 * Create product
 */
const createProduct = async (req, res) => {

  try {

    const { name, description, price, image, category, stock } = req.body;

    if (!name || !description || !price || !image || !category || stock === undefined) {
      return res.status(400).json({
        message: 'All fields required'
      });
    }

    const sql = `
      INSERT INTO products
      (name, description, price, image, category, stock)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id
    `;

    const result = await db.query(sql, [
      name,
      description,
      price,
      image,
      category,
      stock
    ]);

    const id = result.rows[0].id;

    res.status(201).json({
      id,
      name,
      description,
      price,
      image,
      category,
      stock,
      message: 'Product created'
    });

  } catch (err) {

    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Error creating product' });

  }

};


/**
 * Update product
 */
const updateProduct = async (req, res) => {

  try {

    const productId = req.params.id;

    const { name, description, price, image, category, stock } = req.body;

    const sql = `
      UPDATE products
      SET name=$1, description=$2, price=$3, image=$4, category=$5, stock=$6
      WHERE id=$7
    `;

    const result = await db.query(sql, [
      name,
      description,
      price,
      image,
      category,
      stock,
      productId
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated',
      productId
    });

  } catch (err) {

    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Error updating product' });

  }

};


/**
 * Delete product
 */
const deleteProduct = async (req, res) => {

  try {

    const productId = req.params.id;

    const sql = 'DELETE FROM products WHERE id = $1';

    const result = await db.query(sql, [productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product deleted',
      productId
    });

  } catch (err) {

    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Error deleting product' });

  }

};


/**
 * Search products
 */
const searchProducts = async (req, res) => {

  try {

    const query = `%${req.params.query}%`;

    const sql = `
      SELECT * FROM products
      WHERE name ILIKE $1 OR description ILIKE $1
      ORDER BY name
    `;

    const result = await db.query(sql, [query]);

    const formattedProducts = result.rows.map(formatProduct);

    res.json(formattedProducts);

  } catch (err) {

    console.error('Error searching products:', err);
    res.status(500).json({ message: 'Error searching products' });

  }

};


/**
 * Products by category
 */
const getProductsByCategory = async (req, res) => {

  try {

    const category = req.params.category;

    const sql = `
      SELECT * FROM products
      WHERE category = $1
      ORDER BY name
    `;

    const result = await db.query(sql, [category]);

    const formattedProducts = result.rows.map(formatProduct);

    res.json(formattedProducts);

  } catch (err) {

    console.error('Error fetching products by category:', err);
    res.status(500).json({ message: 'Error fetching category products' });

  }

};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
};