import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosRequestConfig } from 'axios';

export async function POST(request: NextRequest) {
  const { url, method, headers, params, data } = await request.json();

  const config: AxiosRequestConfig = {
    method,
    url,
    headers: { ...headers },
    params: params || {},
    ...(method !== 'get' && data && { data }),
  };

  try {
    const response = await axios(config);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
