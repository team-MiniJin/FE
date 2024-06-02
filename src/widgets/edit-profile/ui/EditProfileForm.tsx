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
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
  } = useProfile();

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-80 flex-col items-center space-y-8 px-4">
        <ImageUploader
          profileImage={profileImage}
          handleProfileImageChange={handleProfileImageChange}
        />
        <div className="relative flex items-center justify-center">
          <EditableField
            value={nickname}
            onSave={(val) => setNickname(val)}
            inputClassName="text-center text-xl font-bold h-7"
            displayClassName="text-center text-xl font-bold"
          />
        </div>
        <div className="w-full space-y-4">
          <EditableField
            label="이름"
            value={name}
            onSave={(val) => setName(val)}
          />
          <EditableField
            label="이메일"
            value={email}
            onSave={(val) => setEmail(val)}
          />
          <EditableField
            label="연락처"
            value={contact}
            onSave={(val) => setContact(val)}
          />
        </div>
        <div className="w-full">
          <Link href="/change-password" className="hover:text-[#3666FF]">
            비밀번호 변경하기
          </Link>
        </div>
      </div>
    </div>
  );
}
