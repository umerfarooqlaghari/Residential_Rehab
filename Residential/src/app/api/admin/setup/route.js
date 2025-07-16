import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

// POST - Create default admin (one-time setup)
export async function POST() {
  try {
    // Connect to database
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'ak1096561@gmail.com' });
    
    if (existingAdmin) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Admin already exists' 
        },
        { status: 409 }
      );
    }

    // Create default admin
    const defaultAdmin = new Admin({
      username: 'admin',
      email: 'ak1096561@gmail.com',
      phone: '+1234567890',
      password: 'Anaskhan123',
      admin: true
    });

    // Save to database (password will be automatically hashed)
    const savedAdmin = await defaultAdmin.save();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Default admin created successfully',
        admin: {
          id: savedAdmin._id,
          username: savedAdmin.username,
          email: savedAdmin.email,
          phone: savedAdmin.phone,
          admin: savedAdmin.admin,
          createdAt: savedAdmin.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating default admin:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationErrors
        },
        { status: 400 }
      );
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Admin with this email already exists' 
        },
        { status: 409 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
