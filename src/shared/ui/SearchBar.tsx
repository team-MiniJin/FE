'use client';

import { FiSearch } from 'react-icons/fi';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SearchBar(properties: any) {
  return (
    <div className="flex h-[40px] items-center space-x-3 rounded-md border px-3 py-2 text-sm">
      <span>
        <FiSearch className="text-lg text-slate-900" />
      </span>
      <input
        type="text"
        aria-label="Search"
        className="w-full outline-none placeholder:text-[--text-description-color]"
        placeholder="검색어를 입력해 주세요."
        {...properties}
      />
    </div>
  );
}
