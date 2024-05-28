import { NextResponse } from 'next/server';

// Mock 서버의 URL 설정
const MOCK_SERVER_URL =
  'https://306fb224-5596-41db-a234-a210a9ce18ea.mock.pstmn.io';

export async function GET() {
  try {
    // Mock 서버로 요청 보내기
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
