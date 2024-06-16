'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  selectedCategoryName: string;
  setSelectedCategoryName: (name: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (name: number | null) => void;
}

export default function CategoryFilter({
  selectedCategoryName,
  setSelectedCategoryName,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryFilterProps) {
  const [select, setSelect] = useState(false);

  const categories = [
    { name: '관광지', contentTypeId: 12 },
    { name: '문화시설', contentTypeId: 14 },
    { name: '축제/공연/행사', contentTypeId: 15 },
    { name: '레포츠', contentTypeId: 28 },
    { name: '숙박', contentTypeId: 32 },
    { name: '쇼핑', contentTypeId: 38 },
    { name: '음식', contentTypeId: 39 },
  ];

  // select=true면 카테고리 목록 드롭박스 나타남
  const handleClick = () => {
    setSelect((prev) => !prev);
  };

  const handleCategoryClick = (name: string, contentTypeId: number) => {
    // 동일 카테고리 두번 클릭 시 선택 초기화
    if (selectedCategoryId === contentTypeId) {
      setSelectedCategoryId(null);
      setSelectedCategoryName('');
    } else {
      setSelectedCategoryId(contentTypeId);
      setSelectedCategoryName(name);
    }
    setSelect(false); // 카테고리 선택 시 드롭박스 닫힘
  };

  return (
    <div className="relative px-4">
      <button
        type="button"
        onClick={handleClick}
        className={`hover:font-bold hover:text-[--brand-color] ${select ? 'font-bold text-[--brand-color]' : ''}`}
      >
        카테고리선택
      </button>
      {selectedCategoryName && (
        <span className="font-bold text-[--brand-color]">{` > ${selectedCategoryName}`}</span>
      )}
      <section
        className={`absolute left-0 top-7 w-32 bg-gray-100 py-[4px] text-sm transition-all duration-500 ease-in-out ${select ? 'h-[176px] opacity-100' : 'h-0 opacity-0'}`}
      >
        {select &&
          categories.map((type) => (
            <div key={type.contentTypeId} className="leading-[1.5rem]">
              <button
                type="button"
                onClick={() =>
                  handleCategoryClick(type.name, type.contentTypeId)
                }
                className={`w-full text-center hover:font-bold hover:text-[--brand-color] ${
                  selectedCategoryId === type.contentTypeId
                    ? 'font-bold text-[--brand-color]'
                    : ''
                }`}
              >
                {type.name}
              </button>
            </div>
          ))}
      </section>
    </div>
  );
}
