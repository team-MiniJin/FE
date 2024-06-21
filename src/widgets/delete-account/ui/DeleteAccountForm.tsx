'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetcher, TRAVEL_URL } from '@/shared';
import { useRouter } from 'next/navigation';

export default function DeleteAccountForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      console.error('JWT가 없습니다. 요청을 보내지 않습니다.');
      return; // JWT가 없으면 요청을 보내지 않음
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: jwt,
    };
    try {
      const response = await fetcher(TRAVEL_URL, '/users', 'delete', headers);
      if (response) {
        console.log('응답', response);
        if (response.data.success) {
          setSuccessMessage('회원 탈퇴 되었습니다.');
        }
      }
    } catch (error: any) {
      console.log('에러', error);
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8 rounded-lg bg-white p-8 shadow-xl">
      <div className="font-bold">회원탈퇴하기</div>
      <div>회원탈퇴 시 모든 데이터가 영구적으로 삭제됩니다.</div>
      <div>회원탈퇴를 진행하시겠습니까?</div>
      <Button
        className="bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
        onClick={onSubmit}
      >
        회원탈퇴하기
      </Button>
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
          <div className="space-y-4 p-8 text-center">
            <p className="text-lg font-semibold">{successMessage}</p>
            <Button
              className="bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
              onClick={() => router.push('/login')}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
