'use client';

import { useState } from 'react';
import {
  SearchKeyword,
  PlacesList,
  AreaFilter,
  CategoryFilter,
} from '@/widgets';
import { AiOutlineReload, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useInfiniteQuery } from '@tanstack/react-query';
import useIntersectionObserver from '@/widgets/travel-info/hooks/useIntersectionObserver';
import { TRAVEL_URL } from '@/shared';

export default function TravelInfo() {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedAreaCode, setSelectedAreaCode] = useState<number | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string>('');
  const [selectedSigunguCode, setSelectedSigunguCode] = useState<number | null>(
    null
  );
  const [selectedSigunguName, setSelectedSigunguName] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

  const fetchPlaces = async ({ pageParam = 1 }) => {
    const contentTypeIdParam = selectedCategoryId
      ? `&contentTypeId=${selectedCategoryId}`
      : '';
    const keywordParam = keyword ? `&keyword=${keyword}` : '';
    const areaCodeParam = selectedAreaCode
      ? `&areaCode=${selectedAreaCode}`
      : '';
    const sigunguCodeParam = selectedSigunguCode
      ? `&sigunguCode=${selectedSigunguCode}`
      : '';
    const url = keywordParam.length
      ? `${TRAVEL_URL}/tour/info/searchKeyword1?numOfRows=10&pageNo=${pageParam}&MobileOS=ETC&MobileApp=APPTest&serviceKey=0&_type=json&listYN=Y&arrange=O${contentTypeIdParam}${areaCodeParam}${sigunguCodeParam}${keywordParam}`
      : `${TRAVEL_URL}/tour/info/areaBasedList1?numOfRows=10&pageNo=${pageParam}&MobileOS=ETC&MobileApp=APPTest&serviceKey=0&_type=json&listYN=Y&arrange=O${contentTypeIdParam}${areaCodeParam}${sigunguCodeParam}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return {
      items: data.response.body.items.item,
      nextPage:
        data.response.body.items.item.length === 10 ? pageParam + 1 : undefined,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      'places',
      keyword,
      selectedAreaCode,
      selectedSigunguCode,
      selectedCategoryId,
    ],
    queryFn: fetchPlaces,
    getNextPageParam: (lastPage, pages) => {
      // lastPage가 없는 경우 undefined 반환
      if (!lastPage || !lastPage.items || lastPage.items.length === 0) {
        return undefined;
      }
      // 불러올 데이터가 더 이상 없으면 undefined 반환
      if (lastPage.items.length < 10) {
        return undefined;
      }
      // 데이터가 더 있으면 다음 페이지 반환
      return pages.length + 1;
    },
    initialPageParam: 1, // 초기 페이지 번호 설정
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSearch = async () => {
    scrollToTop();
    await refetch();
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedAreaCode(null);
    setSelectedAreaName('');
    setSelectedSigunguCode(null);
    setSelectedSigunguName('');
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
    refetch();
  };

  // 무한 스크롤을 위한 Intersection Observer 사용
  const loaderRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 z-10 flex w-full border-y border-gray-200 bg-white px-4 text-sm">
        <button
          type="button"
          onClick={handleReset}
          disabled={!data}
          className={`flex flex-col items-center justify-center bg-transparent px-4 py-2 text-xs ${!data ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:font-bold hover:text-[--brand-color]'}`}
        >
          <AiOutlineReload className="mr-2" size={20} />
          선택초기화
        </button>
        <div className="flex-1 space-y-4 py-4">
          <AreaFilter
            selectedAreaCode={selectedAreaCode}
            setSelectedAreaCode={setSelectedAreaCode}
            selectedSigunguCode={selectedSigunguCode}
            setSelectedSigunguCode={setSelectedSigunguCode}
            setSelectedAreaName={setSelectedAreaName}
            setSelectedSigunguName={setSelectedSigunguName}
          />
          <CategoryFilter
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedCategoryName={setSelectedCategoryName}
          />
        </div>
        <div className="flex items-center">
          <SearchKeyword setKeyword={setKeyword} onSearch={handleSearch} />
        </div>
      </div>
      <div className="h-full w-full">
        {isLoading ? (
          <div className="flex h-[calc(100vh-13rem)] w-full flex-col items-center justify-center">
            <AiOutlineLoading3Quarters
              className="animate-spin"
              size={48}
              color="gray"
            />
          </div>
        ) : (
          <>
            {data?.pages.flatMap((page) => page.items).length ? (
              <div className="w-full overflow-y-auto">
                <PlacesList
                  apiData={data.pages.flatMap((page) => page.items)}
                />
              </div>
            ) : (
              <div className="flex h-[calc(100vh-13rem)] w-full flex-col items-center justify-center">
                일치하는 결과가 없습니다.
              </div>
            )}
          </>
        )}
        <div ref={loaderRef} className="h-1 bg-transparent" />
        {isFetchingNextPage && hasNextPage && (
          <div className="flex justify-center">
            <AiOutlineLoading3Quarters
              className="animate-spin"
              size={24}
              color="gray"
            />
          </div>
        )}
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 rounded-md bg-[--brand-color] px-4 py-2 text-white shadow-md hover:opacity-50"
        >
          맨 위로
        </button>
      </div>
    </div>
  );
}
