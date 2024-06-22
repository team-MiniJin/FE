'use client';

import { IoMdArrowBack } from 'react-icons/io';

import { useRouter } from 'next/navigation';

export default function BackLink({ classNames }: { classNames?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={`flex items-center space-x-2 ${classNames} rounded px-2 py-2 hover:bg-slate-100`}
      onClick={() => router.back()}
    >
      <IoMdArrowBack />
      돌아가기
    </button>
  );
}
