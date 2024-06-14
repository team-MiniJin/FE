import { Logo, Input, Button } from '@/shared';

export default function ChangePasswordForm() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center px-4">
        <Logo />
        <div className="mt-8 w-full space-y-4">
          <h2 className="font-bold">비밀번호 변경하기</h2>
          <Input placeholder="기존 비밀번호" type="password" name="password" />
          <Input placeholder="새 비밀번호" type="password" name="newPassword" />
          <Input
            placeholder="새 비밀번호 확인"
            type="password"
            name="checkNewPassword"
          />
          <Button text="변경하기" />
        </div>
      </div>
    </div>
  );
}
