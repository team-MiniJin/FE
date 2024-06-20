'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher, TRAVEL_URL, useAuth } from '@/shared';

export default function KakaoRedirect() {
  const { setJwt } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher(
          TRAVEL_URL,
          '/auth/jwt',
          'get',
          undefined,
          undefined,
          undefined,
          true
        );
        const jwt = response && response.headers.authorization;
        if (jwt) {
          localStorage.setItem('jwt', jwt);
          setJwt(jwt);
          alert('로그인 되었습니다.');
          router.push('/');
        } else {
          console.error('JWT 토큰이 없습니다.');
        }
      } catch (error: any) {
        console.error('에러:', error);
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-xl font-bold">로그인 처리 중...</h1>
    </div>
  );
}
