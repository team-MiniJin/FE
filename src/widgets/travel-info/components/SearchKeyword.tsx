'use client';

import { ChangeEvent } from 'react';
import { SearchBar } from '@/shared';

interface FilterAreaProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onSearch: (keyword: string) => void;
}

export default function SearchKeyword({
  keyword,
  setKeyword,
  onSearch,
}: FilterAreaProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="flex flex-1 items-center space-x-4">
      <div className="relative">
        <button
          type="button"
          onClick={handleSearch}
          className="absolute left-[5px] top-[5px] h-[30px] w-[30px] bg-white px-4 py-2 text-[0px] opacity-0 hover:opacity-50"
          aria-label="검색버튼"
        />
        <SearchBar
          value={keyword}
          onChange={handleInputChange}
          placeholder="장소를 검색하세요"
          onKeyPress={handleInputKeyPress}
        />
      </div>
    </div>
  );
}
