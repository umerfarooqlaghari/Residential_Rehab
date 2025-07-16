import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Consultation from '@/models/Consultation';

// POST - Create a new consultation request
export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { name, email, phone, propertyAddress, inquiryType, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, email, phone, and inquiry type are required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Validate inquiry type
    const validInquiryTypes = ['sell', 'invest', 'other'];
    if (!validInquiryTypes.includes(inquiryType)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid inquiry type' 
        },
        { status: 400 }
      );
    }

    // Create new consultation record
    const consultation = new Consultation({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      propertyAddress: propertyAddress ? propertyAddress.trim() : '',
      inquiryType,
      message: message ? message.trim() : '',
      status: 'new'
    });

    // Save to database
    const savedConsultation = await consultation.save();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request submitted successfully',
        data: {
          id: savedConsultation._id,
          name: savedConsultation.name,
          email: savedConsultation.email,
          inquiryType: savedConsultation.inquiryType,
          createdAt: savedConsultation.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating consultation:', error);

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

    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A consultation request with this email already exists' 
        },
        { status: 409 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve consultation requests (for admin use)
export async function GET(request) {
  try {
    // Connect to database
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const inquiryType = searchParams.get('inquiryType');

    // Build query
    const query = {};
    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get consultations with pagination
    const consultations = await Consultation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    // Get total count for pagination
    const total = await Consultation.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: consultations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// PATCH - Update consultation status (admin only)
export async function PATCH(request) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { id, status } = body;

    // Validate required fields
    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Consultation ID and status are required'
        },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['new', 'contacted', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
        },
        { status: 400 }
      );
    }

    // Find and update consultation
    const consultation = await Consultation.findByIdAndUpdate(
      id,
      {
        status: status,
        updatedAt: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!consultation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Consultation not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation status updated successfully',
      consultation: consultation
    });

  } catch (error) {
    console.error('Error updating consultation status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
