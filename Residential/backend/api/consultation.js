import express from 'express';
import connectDB from '../lib/mongodb.js';
import Consultation from '../models/Consultation.js';
import { sendConsultationAutoReply } from '../lib/email.js';

const router = express.Router();

// POST - Create a new consultation request
router.post('/', async (req, res) => {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const { name, email, phone, propertyAddress, inquiryType, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !inquiryType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone, and inquiry type are required'
      });
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Validate inquiry type
    const validInquiryTypes = ['sell', 'invest', 'other'];
    if (!validInquiryTypes.includes(inquiryType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid inquiry type'
      });
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

    // Send automated email reply to user
    try {
      const emailResult = await sendConsultationAutoReply({
        to: savedConsultation.email,
        name: savedConsultation.name,
        inquiryType: savedConsultation.inquiryType,
        message: savedConsultation.message || '',
        propertyAddress: savedConsultation.propertyAddress || ''
      });
      console.log('Auto-reply email sent successfully:', emailResult.messageId || 'API response received');
    } catch (emailError) {
      console.error('Failed to send auto-reply email after all attempts:', emailError.message);
      // Do not fail the request if email sending fails
    }

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully',
      data: {
        id: savedConsultation._id,
        name: savedConsultation.name,
        email: savedConsultation.email,
        inquiryType: savedConsultation.inquiryType,
        createdAt: savedConsultation.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating consultation:', error);

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'A consultation request with this email already exists'
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
});

// GET - Retrieve consultation requests (for admin use)
router.get('/', async (req, res) => {
  try {
    // Connect to database
    await connectDB();

    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const inquiryType = req.query.inquiryType;

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

    return res.json({
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
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PATCH - Update consultation status (admin only)
router.patch('/', async (req, res) => {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const { id, status } = req.body;

    // Validate required fields
    if (!id || !status) {
      return res.status(400).json({
        success: false,
        error: 'Consultation ID and status are required'
      });
    }

    // Validate status value
    const validStatuses = ['new', 'contacted', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
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
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      });
    }

    return res.json({
      success: true,
      message: 'Consultation status updated successfully',
      consultation: consultation
    });

  } catch (error) {
    console.error('Error updating consultation status:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
