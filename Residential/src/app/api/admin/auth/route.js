import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// POST - Admin Login (proxy to backend)
export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error proxying admin login:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process login. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// GET - Check if admin exists (proxy to backend)
export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error proxying admin check:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
