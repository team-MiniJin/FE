import { Logo, Input, Button } from '@/shared';

export default function FindPasswordForm() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <div className="mt-8 w-full space-y-4">
          <h2 className="font-bold">비밀번호 찾기</h2>
          <Input placeholder="이름" name="name" />
          <Input placeholder="이메일" name="email" />
          <Input placeholder="아이디" name="id" />
          <Button text="비밀번호 확인" />
        </div>
      </div>
    </div>
  );
}
