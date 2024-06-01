import { Logo, Input, Button } from '@/shared';

export default function FindPassword() {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <div className="mt-8 w-full space-y-4">
          <h2 className="font-bold">비밀번호 변경하기</h2>
          <Input placeholder="기존 비밀번호" type="password" />
          <Input placeholder="새 비밀번호" type="password" />
          <Input placeholder="새 비밀번호 확인" type="password" />
          <Button text="변경하기" />
        </div>
      </div>
    </div>
  );
}
