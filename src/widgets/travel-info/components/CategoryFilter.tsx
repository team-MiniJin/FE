'use client';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectValue,
} from '@/components/ui/select';

interface CategoryFilterProps {
  setSelectedCategoryName: (name: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

export default function CategoryFilter({
  setSelectedCategoryName,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryFilterProps) {
  const categories = [
    { name: '관광지', contentTypeId: 12 },
    { name: '문화시설', contentTypeId: 14 },
    { name: '축제/공연/행사', contentTypeId: 15 },
    { name: '레포츠', contentTypeId: 28 },
    { name: '숙박', contentTypeId: 32 },
    { name: '쇼핑', contentTypeId: 38 },
    { name: '음식', contentTypeId: 39 },
  ];

  const handleCategoryChange = (value: string) => {
    const contentTypeId = Number(value);
    const selectedCategory = categories.find(
      (category) => category.contentTypeId === contentTypeId
    );
    if (selectedCategory) {
      setSelectedCategoryId(contentTypeId);
      setSelectedCategoryName(selectedCategory.name);
    }
  };

  return (
    <div className="relative w-56 px-4">
      <Select
        onValueChange={handleCategoryChange}
        value={selectedCategoryId?.toString() || ''}
      >
        <SelectTrigger>
          <SelectValue placeholder="카테고리선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category) => (
              <SelectItem
                key={category.contentTypeId}
                value={category.contentTypeId.toString()}
                className={`${
                  selectedCategoryId === category.contentTypeId
                    ? 'font-bold text-[--brand-color]'
                    : ''
                }`}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
