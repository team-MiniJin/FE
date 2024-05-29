import { NextResponse } from 'next/server';
import { MOCK_SERVER_URL } from '@/app/api/plans/constants/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const response = await fetch(
      `${MOCK_SERVER_URL}/plans?cursor=%22${cursor}%22`
    );
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
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
