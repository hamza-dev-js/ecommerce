const { Pool } = require('pg');

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';

// PostgreSQL connection
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: isProduction ? { rejectUnauthorized: false } : false // SSL only in production
});

// Test database connection
db.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to PostgreSQL database:', err.message);
    return;
  }
  console.log('✅ Connected to PostgreSQL successfully');
  release();
});

module.exports = db;