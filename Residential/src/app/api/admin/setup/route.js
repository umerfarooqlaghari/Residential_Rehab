import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb.js';
import Admin from '@/models/Admin.js';

// POST - Create default admin
export async function POST(request) {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        error: 'Admin already exists'
      }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Name, email, and password are required'
      }, { status: 400 });
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

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Admin setup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
