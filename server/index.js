import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;
const SECRET_KEY = 'your-very-secret-key-change-me'; // In a real app, use environment variables

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new Database(join(__dirname, 'database.sqlite'));

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    otp TEXT DEFAULT '123456',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const insert = db.prepare('INSERT INTO users (email, password, otp) VALUES (?, ?, ?)');
    insert.run(email, password, '123456');
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Login Endpoint (Step 1: Credentials)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Success - move to OTP step
    res.json({ 
      message: 'Credentials verified',
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// OTP Verification Endpoint (Step 2: OTP)
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user || user.otp !== otp) {
      return res.status(401).json({ error: 'Invalid verification code' });
    }

    // OTP Correct - Generate final token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
    
    res.json({ 
      message: 'Login successful', 
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('OTP Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard Stats Endpoint
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  // Mock data for now, could be calculated from DB in future
  res.json({
    stats: [
      { label: 'Total Balance', value: '$128,430.00', change: '+12.5%', trend: 'up' },
      { label: 'Net Revenue', value: '$45,210.50', change: '+8.2%', trend: 'up' },
      { label: 'Active Subscriptions', value: '1,240', change: '-2.4%', trend: 'down' },
      { label: 'Pending Payouts', value: '$8,900.00', change: '+14.1%', trend: 'up' },
    ]
  });
});

// Dashboard Transactions Endpoint
app.get('/api/dashboard/transactions', authenticateToken, (req, res) => {
  res.json({
    transactions: [
      { id: '1', customer: req.user.email, amount: '$20.00', status: 'Succeeded', date: 'Just now', type: 'Payment' },
      { id: '2', customer: 'alex.smith@company.com', amount: '$150.00', status: 'Succeeded', date: '2 mins ago', type: 'Payment' },
      { id: '3', customer: 'jane.doe@startup.io', amount: '$45.00', status: 'Pending', date: '15 mins ago', type: 'Subscription' },
      { id: '4', customer: 'marketing@global.net', amount: '$1,200.00', status: 'Succeeded', date: '1 hour ago', type: 'Payout' },
      { id: '5', customer: 'dev.ops@cloud.tech', amount: '$30.00', status: 'Failed', date: '3 hours ago', type: 'Payment' },
    ]
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
