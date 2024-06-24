'use client';

import { useState, useEffect } from 'react';
import { TRAVEL_URL } from '@/shared';
import SigunguCode from './SigunguCode';

interface AreaCodeProps {
  code: number;
  name: string;
  isSelected: boolean;
  onClick: (areaCode: number, areaName: string) => void;
  selectedSigunguCode: number | null;
  onSigunguClick: (sigunguCode: number, sigunguName: string) => void;
  initiallySelectedAreaCode: number | null;
}

export default function AreaCode({
  code,
  name,
  isSelected,
  onClick,
  selectedSigunguCode,
  initiallySelectedAreaCode,
  onSigunguClick,
}: AreaCodeProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSelected && initiallySelectedAreaCode === code) {
      fetchData();
    }
  }, [isSelected, initiallySelectedAreaCode]);

  const url = `${TRAVEL_URL}/tour/info/areaCode1?serviceKey=0&areaCode=${code}&numOfRows=100&MobileOS=ETC&MobileApp=APPTest&_type=json`;

  const fetchData = async () => {
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('네트워크 응답에 문제가 있습니다.');
      }
      const result = await response.json();
      setData(result.response.body.items.item);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleClick = async () => {
    if (!isSelected) await fetchData();
    onClick(code, name);
  };

  return (
    <div className="leading-[1.5rem]">
      <button
        type="button"
        onClick={handleClick}
        className={`w-full text-center hover:font-bold hover:text-[--brand-color] ${isSelected ? 'font-bold text-[--brand-color]' : ''} transition-all duration-300`}
      >
        {name}
      </button>
      {error && <p>오류: {error}</p>}
      <section
        className={`absolute left-32 top-0 z-10 bg-gray-100 text-sm transition-all duration-500 ${isSelected ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}
      >
        {isSelected &&
          data &&
          data.map((area) => (
            <SigunguCode
              key={area.sigungucode}
              code={area.sigungucode}
              name={area.name}
              isSelected={selectedSigunguCode === area.sigungucode}
              onClick={onSigunguClick}
            />
          ))}
      </section>
    </div>
  );
}
