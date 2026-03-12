const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
const register = async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const checkUserSql = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const userResult = await db.query(checkUserSql, [username, email]);

    if (userResult.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql =
      'INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING id';

    const result = await db.query(insertSql, [
      username,
      email,
      hashedPassword
    ]);

    const userId = result.rows[0].id;

    const token = jwt.sign(
      { userId, username, role: 'user' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userId,
        username,
        email,
        role: 'user'
      }
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });

  }
};

// Login
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = $1';

    const result = await db.query(sql, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });

  }
};


// Get current user
const getMe = async (req, res) => {

  try {

    const sql = 'SELECT id, username, email, role FROM users WHERE id = $1';

    const result = await db.query(sql, [req.user.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: result.rows[0] });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'Server error' });

  }

};

module.exports = { register, login, getMe };