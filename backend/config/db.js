const mysql = require('mysql2');

/**
 * MySQL database connection configuration
 * Uses environment variables for security
 */
const db = mysql.createConnection({
  host: process.env.DB_HOST  ,
  user: process.env.DB_USER  ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  charset: 'utf8mb4'
});

/**
 * Connect to MySQL database
 * Handles connection errors and success
 */
db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL database:', err.message);
    console.log('💡 Please check your database configuration and ensure MySQL is running');
    return;
  }
  console.log('✅ Connected to MySQL database successfully');
  console.log(`📊 Database: ${process.env.DB_NAME || 'ecommerce'}`);
});

// Export database connection for use in other files
module.exports = db;