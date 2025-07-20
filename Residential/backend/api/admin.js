import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import connectDB from '../lib/mongodb.js';
import Admin from '../models/Admin.js';

const router = express.Router();

// POST - Admin login
router.post('/login', async (req, res) => {
  try {
    await connectDB();
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      config.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );
    
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name
      }
    });
    
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST - Create admin (setup route)
router.post('/setup', async (req, res) => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: 'Admin already exists'
      });
    }
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create admin
    const admin = new Admin({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });
    
    await admin.save();
    
    return res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
    
  } catch (error) {
    console.error('Admin setup error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.'
    });
  }
  
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET || 'fallback-secret');
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// GET - Verify token and get admin info
router.get('/me', verifyToken, async (req, res) => {
  try {
    await connectDB();
    
    const admin = await Admin.findById(req.admin.adminId).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found'
      });
    }
    
    return res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
    
  } catch (error) {
    console.error('Get admin info error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
