import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb.js';
import Admin from '@/models/Admin.js';

// Helper function to verify JWT token
function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  if (!token) {
    return { error: 'Access denied. No token provided.', status: 401 };
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    return { decoded };
  } catch (error) {
    return { error: 'Invalid token', status: 401 };
  }
}

// GET - Verify token and get admin info
export async function GET(request) {
  try {
    const tokenResult = verifyToken(request);
    if (tokenResult.error) {
      return NextResponse.json({
        success: false,
        error: tokenResult.error
      }, { status: tokenResult.status });
    }
    
    await connectDB();
    
    const admin = await Admin.findById(tokenResult.decoded.adminId).select('-password');
    if (!admin) {
      return NextResponse.json({
        success: false,
        error: 'Admin not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
    
  } catch (error) {
    console.error('Get admin info error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
