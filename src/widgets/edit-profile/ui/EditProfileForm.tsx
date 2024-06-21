'use client';

import Link from 'next/link';
import { EditableField, ImageUploader } from '@/shared';
import { useProfile } from '@/widgets/edit-profile/model/hooks';

export default function EditProfileForm() {
  const {
    profileImage,
    handleProfileImageChange,
    nickname,
    setNickname,
    email,
    setEmail,
  } = useProfile();

  return (
    <div className="flex w-full max-w-sm flex-col items-center space-y-8 rounded-lg bg-white px-16 py-8 shadow-xl">
      <ImageUploader
        profileImage={profileImage}
        handleProfileImageChange={handleProfileImageChange}
      />
      <div className="relative flex items-center justify-center">
        <EditableField
          value={nickname}
          onSave={(val) => setNickname(val)}
          label="닉네임"
          inputClassName="text-xl font-bold h-7"
          displayClassName="text-xl font-bold"
        />
      </div>
      <div className="relative flex items-center justify-center">
        <EditableField
          label="이메일"
          value={email}
          onSave={(val) => setEmail(val)}
        />
      </div>
      <div className="flex h-8 w-full justify-center">
        <Link href="/change-password" className="hover:text-[#3666FF]">
          비밀번호 변경하기
        </Link>
      </div>
    </div>
  );
}
