'use client';

import React from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  profileImage: string;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({
  profileImage,
  handleProfileImageChange,
}: ImageUploaderProps) {
  return (
    <div className="relative h-48 w-48 overflow-hidden rounded-full bg-gray-400 hover:bg-gray-500">
      <label
        htmlFor="profileImageInput"
        className="absolute inset-0 flex cursor-pointer items-center justify-center"
      >
        <input
          type="file"
          id="profileImageInput"
          className="hidden"
          accept="image/*"
          onChange={handleProfileImageChange}
        />
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필 이미지"
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="text-center">
            프로필 사진
            <br /> 추가하기
          </div>
        )}
      </label>
    </div>
  );
}
