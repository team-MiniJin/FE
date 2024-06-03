import { Logo, Input, Button } from '@/shared';

export default function FindPasswordForm() {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <div className="mt-8 w-full space-y-4">
          <h2 className="font-bold">비밀번호 찾기</h2>
          <Input placeholder="이름" />
          <Input placeholder="이메일" />
          <Input placeholder="아이디" />
          <Button text="비밀번호 확인" />
        </div>
      </div>
    </div>
  );
}
