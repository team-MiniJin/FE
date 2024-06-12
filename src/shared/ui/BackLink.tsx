import { IoMdArrowBack } from 'react-icons/io';

import Link from 'next/link';

export default function BackLink({ classNames }: { classNames?: string }) {
  return (
    <Link
      className={`flex items-center space-x-2 ${classNames} rounded px-2 py-2 hover:bg-slate-100`}
      href="/my-travels"
    >
      <IoMdArrowBack />
      <span className="text-base">돌아가기</span>
    </Link>
  );
}
