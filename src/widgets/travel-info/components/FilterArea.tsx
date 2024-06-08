'use client';

import { ChangeEvent } from 'react';

interface FilterAreaProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onCategorySelect: (categoryId: number) => void;
  selectedCategoryId: number | null;
  onSearch: (keyword: string) => void;
}

export default function FilterArea({
  keyword,
  setKeyword,
  onCategorySelect,
  selectedCategoryId,
  onSearch,
}: FilterAreaProps) {
  const categories = [
    { name: '관광지', contentTypeId: 12 },
    { name: '문화시설', contentTypeId: 14 },
    { name: '축제/공연/행사', contentTypeId: 15 },
    { name: '레포츠', contentTypeId: 28 },
    { name: '숙박', contentTypeId: 32 },
    { name: '쇼핑', contentTypeId: 38 },
    { name: '음식', contentTypeId: 39 },
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleCategoryClick = (contentTypeId: number) => {
    onCategorySelect(contentTypeId);
  };

  return (
    <nav className="mx-auto flex h-16 max-w-[calc(1024px-4rem)] items-center">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <button
            type="button"
            key={category.name}
            className="cursor-pointer text-lg font-normal"
            onClick={() => handleCategoryClick(category.contentTypeId)}
            style={{
              fontWeight:
                selectedCategoryId === category.contentTypeId
                  ? 'bold'
                  : 'normal',
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="장소를 검색하세요"
          className="w-48 border-b border-gray-400 text-center text-gray-500"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          검색
        </button>
      </div>
    </nav>
  );
}
