// import { NextResponse } from 'next/server';

// // const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';
// const BACKEND_URL = 'https://residential-rehab-bdyh.vercel.app'

// // POST - Create a new consultation request (proxy to backend)
// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const response = await fetch(`${BACKEND_URL}/api/consultation`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     return NextResponse.json(data, { status: response.status });

//   } catch (error) {
//     console.error('Error proxying consultation request:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to process request. Please try again later.'
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET - Retrieve consultation requests (proxy to backend)
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const queryString = searchParams.toString();

//     const response = await fetch(`${BACKEND_URL}/api/consultation?${queryString}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();

//     return NextResponse.json(data, { status: response.status });

//   } catch (error) {
//     console.error('Error proxying consultation GET request:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Internal server error'
//       },
//       { status: 500 }
//     );
//   }
// }

// // PATCH - Update consultation status (proxy to backend)
// export async function PATCH(request) {
//   try {
//     const body = await request.json();

//     const response = await fetch(`${BACKEND_URL}/api/consultation`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     return NextResponse.json(data, { status: response.status });

//   } catch (error) {
//     console.error('Error proxying consultation PATCH request:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Internal server error'
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Consultation from '@/models/Consultation.js';

// ---------------- POST: Create consultation ----------------
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, propertyAddress, inquiryType, message } = body;

    if (!name || !email || !phone || !inquiryType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, phone, and inquiry type' },
        { status: 400 }
      );
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const validInquiryTypes = ['sell', 'invest', 'other'];
    if (!validInquiryTypes.includes(inquiryType)) {
      return NextResponse.json({ success: false, error: 'Invalid inquiry type' }, { status: 400 });
    }

    const consultation = new Consultation({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      propertyAddress: propertyAddress?.trim() || '',
      inquiryType,
      message: message?.trim() || '',
      status: 'new',
    });

    const savedConsultation = await consultation.save();

    return NextResponse.json({
      success: true,
      message: 'Consultation submitted successfully',
      data: {
        id: savedConsultation._id,
        name: savedConsultation.name,
        email: savedConsultation.email,
        inquiryType: savedConsultation.inquiryType,
        createdAt: savedConsultation.createdAt,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// ---------------- GET: List consultations ----------------
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const inquiryType = searchParams.get('inquiryType');

    const query = {};
    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    const skip = (page - 1) * limit;

    const consultations = await Consultation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Consultation.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: consultations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// ---------------- PATCH: Update consultation status ----------------
export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Consultation ID and status are required' }, { status: 400 });
    }

    const validStatuses = ['new', 'contacted', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status value' }, { status: 400 });
    }

    const updated = await Consultation.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Consultation not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation status updated successfully',
      consultation: updated,
    });

  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

