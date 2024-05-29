import { Button, Input, Logo } from '@/shared';
import Link from 'next/link';

export default function LogIn() {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <div className="mt-8 w-full space-y-4">
          <Input placeholder="아이디" />
          <Input placeholder="비밀번호" type="password" />
          <Button text="로그인" />
          <div className="flex justify-between text-sm">
            <Link href="/join">회원가입</Link>
            <Link href="/findPassword">비밀번호 찾기</Link>
          </div>
          <div className="flex w-full items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">또는</span>
            <hr className="flex-1 border-gray-300" />
          </div>
          <Button text="카카오톡 로그인" styleType="kakao" />
        </div>
      </div>
    </div>
  );
}
