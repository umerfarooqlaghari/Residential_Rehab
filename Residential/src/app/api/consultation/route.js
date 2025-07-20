import { NextResponse } from 'next/server';

// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';
const BACKEND_URL = 'https://residential-rehab-bdyh.vercel.app'

// POST - Create a new consultation request (proxy to backend)
export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/consultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error proxying consultation request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request. Please try again later.'
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve consultation requests (proxy to backend)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const response = await fetch(`${BACKEND_URL}/api/consultation?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error proxying consultation GET request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// PATCH - Update consultation status (proxy to backend)
export async function PATCH(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/consultation`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Error proxying consultation PATCH request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
