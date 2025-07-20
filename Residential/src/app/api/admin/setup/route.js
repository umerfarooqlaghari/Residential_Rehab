import { NextResponse } from 'next/server';

// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';
const BACKEND_URL = 'https://residential-rehab-bdyh.vercel.app'

// POST - Create default admin (proxy to backend)
export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/admin/setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error proxying admin setup:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to setup admin. Please try again later.'
      },
      { status: 500 }
    );
  }
}
