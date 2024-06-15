'use client';

import { useState } from 'react';

export default function CategoryFilter({
  onCategorySelect,
  selectedCategoryName,
  setSelectedCategoryName,
}: {
  onCategorySelect: (contentTypeId: number | null) => void;
  selectedCategoryName: string;
  setSelectedCategoryName: (name: string) => void;
}) {
  const [select, setSelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const categories = [
    { name: '관광지', contentTypeId: 12 },
    { name: '문화시설', contentTypeId: 14 },
    { name: '축제/공연/행사', contentTypeId: 15 },
    { name: '레포츠', contentTypeId: 28 },
    { name: '숙박', contentTypeId: 32 },
    { name: '쇼핑', contentTypeId: 38 },
    { name: '음식', contentTypeId: 39 },
  ];

  const handleClick = () => {
    setSelect((prev) => !prev);
  };

  const handleCategoryClick = (name: string, contentTypeId: number) => {
    if (selectedCategory === contentTypeId) {
      setSelectedCategory(null);
      onCategorySelect(null);
      setSelectedCategoryName('');
    } else {
      setSelectedCategory(contentTypeId);
      onCategorySelect(contentTypeId);
      setSelectedCategoryName(name);
    }
    setSelect(false);
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
        className={`absolute left-0 top-12 w-32 bg-gray-100 py-[4px] text-sm transition-all duration-500 ease-in-out ${select ? 'h-[176px] opacity-100' : 'h-0 opacity-0'}`}
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
                  selectedCategory === type.contentTypeId
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
