'use client';

import { useState } from 'react';
import AreaCode from './AreaCode';

export default function AreaFilter({
  onAreaSelect,
  onSigunguSelect,
}: {
  onAreaSelect: (areaCode: number | null) => void;
  onSigunguSelect: (sigunguCode: number | null) => void;
}) {
  const [data, setData] = useState<any[] | null>(null);
  const [select, setSelect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAreaCode, setSelectedAreaCode] = useState<number | null>(null);
  const [selectedSigunguCode, setSelectedSigunguCode] = useState<number | null>(
    null
  );
  const [selectedAreaName, setSelectedAreaName] = useState<string | null>(null);
  const [selectedSigunguName, setSelectedSigunguName] = useState<string | null>(
    null
  );

  const url = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${process.env.NEXT_PUBLIC_TOUR_API_KEY}&numOfRows=100&MobileOS=ETC&MobileApp=APPTest&_type=json`;

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

  const handleClick = () => {
    if (!select && !data) fetchData();
    setSelect((prev) => !prev);
  };

  const handleAreaClick = (areaCode: number, areaName: string) => {
    setSelectedAreaCode((prevCode) =>
      prevCode === areaCode ? null : areaCode
    );
    setSelectedAreaName((prevName) =>
      prevName === areaName ? null : areaName
    );
    setSelectedSigunguCode(null);
    setSelectedSigunguName(null);
    onSigunguSelect(null);
    if (selectedAreaCode === areaCode) {
      onAreaSelect(null);
    } else {
      onAreaSelect(areaCode);
    }
  };

  const handleSigunguClick = (sigunguCode: number, sigunguName: string) => {
    setSelectedSigunguCode((prevCode) =>
      prevCode === sigunguCode ? null : sigunguCode
    );
    setSelectedSigunguName((prevName) =>
      prevName === sigunguName ? null : sigunguName
    );
    onSigunguSelect(selectedSigunguCode);
    setSelect(false);
  };

  return (
    <div className="relative px-4">
      <button
        type="button"
        onClick={handleClick}
        className={`hover:font-bold hover:text-[--brand-color] ${select ? 'font-bold text-[--brand-color]' : ''}`}
      >
        지역선택
      </button>
      {selectedAreaName && (
        <span className="font-bold text-[--brand-color]">{` > ${selectedAreaName}`}</span>
      )}
      {selectedSigunguName && (
        <span className="font-bold text-[--brand-color]">{` > ${selectedSigunguName}`}</span>
      )}
      {error && <p>오류: {error}</p>}
      <section
        className={`absolute left-0 top-12 z-10 w-32 bg-gray-100 py-[4px] text-sm transition-all duration-500 ease-in-out ${select ? 'h-[416px] opacity-100' : 'h-0 opacity-0'}`}
      >
        {select &&
          data &&
          data.map((area) => (
            <AreaCode
              key={area.code}
              code={area.code}
              name={area.name}
              isSelected={selectedAreaCode === area.code}
              onClick={handleAreaClick}
              selectedSigunguCode={selectedSigunguCode}
              onSigunguClick={handleSigunguClick}
              initiallySelectedAreaCode={selectedAreaCode}
            />
          ))}
      </section>
    </div>
  );
}
