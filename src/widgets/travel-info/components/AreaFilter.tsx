'use client';

import { useState } from 'react';
import AreaCode from './AreaCode';

interface AreaFilterProps {
  selectedAreaCode: number | null;
  setSelectedAreaCode: (code: number | null) => void;
  selectedSigunguCode: number | null;
  setSelectedSigunguCode: (code: number | null) => void;
  selectedAreaName: string;
  setSelectedAreaName: (name: string) => void;
  selectedSigunguName: string;
  setSelectedSigunguName: (name: string) => void;
}

export default function AreaFilter({
  selectedAreaCode,
  setSelectedAreaCode,
  selectedSigunguCode,
  setSelectedSigunguCode,
  selectedAreaName,
  setSelectedAreaName,
  selectedSigunguName,
  setSelectedSigunguName,
}: AreaFilterProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [select, setSelect] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${process.env.NEXT_PUBLIC_TOUR_API_KEY}&numOfRows=100&MobileOS=ETC&MobileApp=APPTest&_type=json`;

  // 지역 목록 불러오기
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

  // 지역선택 클릭
  const handleClick = () => {
    if (!data) fetchData(); // 최초 클릭 시 지역목록 불러오기
    setSelect((prev) => !prev); // true면 드롭박스 나타남
  };

  // 드롭박스에서 지역 선택
  const handleAreaClick = (areaCode: number, areaName: string) => {
    // 두번 선택하면 선택해제
    setSelectedAreaCode(selectedAreaCode === areaCode ? null : areaCode);
    setSelectedAreaName(selectedAreaName === areaName ? '' : areaName);

    // 시군구 선택은 초기화
    setSelectedSigunguCode(null);
    setSelectedSigunguName('');
  };

  // 시군구 선택
  const handleSigunguClick = (sigunguCode: number, sigunguName: string) => {
    setSelectedSigunguCode(
      selectedSigunguCode === sigunguCode ? null : sigunguCode
    );
    setSelectedSigunguName(
      selectedSigunguName === sigunguName ? '' : sigunguName
    );
    setSelect(false); // 시군구까지 선택하면 드롭박스 닫힘
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
        className={`absolute left-0 top-7 z-10 w-32 bg-gray-100 py-[4px] text-sm transition-all duration-500 ease-in-out ${select ? 'h-[416px] opacity-100' : 'h-0 opacity-0'}`}
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
