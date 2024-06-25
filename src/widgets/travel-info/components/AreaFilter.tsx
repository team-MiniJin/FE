'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectGroup,
} from '@/components/ui/select';
import { TRAVEL_URL } from '@/shared';

interface AreaFilterProps {
  selectedAreaCode: number | null;
  setSelectedAreaCode: (code: number | null) => void;
  selectedSigunguCode: number | null;
  setSelectedSigunguCode: (code: number | null) => void;
  setSelectedAreaName: (name: string) => void;
  setSelectedSigunguName: (name: string) => void;
}

export default function AreaFilter({
  selectedAreaCode,
  setSelectedAreaCode,
  selectedSigunguCode,
  setSelectedSigunguCode,
  setSelectedAreaName,
  setSelectedSigunguName,
}: AreaFilterProps) {
  const areaUrl = `${TRAVEL_URL}/tour/info/areaCode1?ServiceKey=0&numOfRows=100&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  // 지역 목록 가져오기
  const fetchAreaCodes = async () => {
    const response = await fetch(areaUrl);
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    const result = await response.json();
    return result.response.body.items.item || [];
  };

  const { data: areas, error: areaError } = useQuery({
    queryKey: ['areaCodes'],
    queryFn: fetchAreaCodes,
  });

  // 선택된 지역에 따라 시군구 목록 가져오기
  const fetchSigunguCodes = async (areaCode: number) => {
    const sigunguUrl = `${TRAVEL_URL}/tour/info/areaCode1?serviceKey=0&areaCode=${areaCode}&numOfRows=100&MobileOS=ETC&MobileApp=APPTest&_type=json`;
    const response = await fetch(sigunguUrl);
    if (!response.ok) {
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }
    const result = await response.json();
    return result.response.body.items.item || [];
  };

  const { data: sigungus, error: sigunguError } = useQuery({
    queryKey: ['sigunguCodes', selectedAreaCode],
    queryFn: () => fetchSigunguCodes(selectedAreaCode!),
    enabled: !!selectedAreaCode,
  });

  // 지역 선택 처리
  const handleAreaChange = (value: string) => {
    const areaCode = Number(value);
    const selectedArea = areas?.find(
      (area: any) => Number(area.code) === areaCode
    );
    if (selectedArea) {
      setSelectedAreaCode(areaCode);
      setSelectedAreaName(selectedArea.name);

      setSelectedSigunguCode(null);
      setSelectedSigunguName('');
    }
  };

  // 시군구 선택 처리
  const handleSigunguChange = (value: string) => {
    const sigunguCode = Number(value);
    const selectedSigungu = sigungus?.find(
      (sigungu: any) => Number(sigungu.sigungucode) === sigunguCode
    );
    if (selectedSigungu) {
      if (selectedSigunguCode === sigunguCode) {
        setSelectedSigunguCode(null);
        setSelectedSigunguName('');
      } else {
        setSelectedSigunguCode(sigunguCode);
        setSelectedSigunguName(selectedSigungu.name);
      }
    }
  };

  return (
    <div className="relative flex px-4">
      <div className="mr-4 w-48">
        <Select
          onValueChange={handleAreaChange}
          value={selectedAreaCode?.toString() || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="지역선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton />
            <SelectGroup>
              {areas?.map((area: any) => (
                <SelectItem
                  key={area.code}
                  value={area.code.toString()}
                  className={`${
                    selectedAreaCode === area.code
                      ? 'font-bold text-[--brand-color]'
                      : ''
                  }`}
                >
                  {area.name}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <Select
          onValueChange={handleSigunguChange}
          value={selectedSigunguCode?.toString() || ''}
        >
          <SelectTrigger>
            <SelectValue placeholder="시군구선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectScrollUpButton />
            <div className="p-1">
              {sigungus?.map((sigungu: any) => (
                <SelectItem
                  key={sigungu.sigungucode}
                  value={sigungu.sigungucode.toString()}
                  className={`${
                    selectedSigunguCode === sigungu.sigungucode
                      ? 'font-bold text-[--brand-color]'
                      : ''
                  }`}
                >
                  {sigungu.name}
                </SelectItem>
              ))}
            </div>
            <SelectScrollDownButton />
          </SelectContent>
        </Select>
      </div>

      {areaError && <p>오류: {areaError.message}</p>}
      {sigunguError && <p>오류: {sigunguError.message}</p>}
    </div>
  );
}
