import { NextResponse } from 'next/server';
import { MOCK_SERVER_URL } from '@/app/api/plans/constants/api';

export async function GET() {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/plans/upcoming`);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
