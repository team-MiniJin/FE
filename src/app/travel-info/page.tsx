'use client';

import { useState, useEffect } from 'react';
import {
  SearchKeyword,
  PlacesList,
  AreaFilter,
  CategoryFilter,
} from '@/widgets';
import { PlaceT } from '@/widgets/travel-info/types/Place';
import { AiOutlineReload } from 'react-icons/ai';
import useInfiniteScroll from '@/widgets/travel-info/hooks/useInfiniteScroll';

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

  const [apiData, setApiData] = useState<PlaceT[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = async (pageNo: number, isNewSearch = false) => {
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
      ? `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=10&pageNo=${pageNo}&MobileOS=ETC&MobileApp=APPTest&serviceKey=${process.env.NEXT_PUBLIC_TOUR_API_KEY}&_type=json&listYN=Y&arrange=O${contentTypeIdParam}${areaCodeParam}${sigunguCodeParam}${keywordParam}`
      : `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=${pageNo}&MobileOS=ETC&MobileApp=APPTest&serviceKey=${process.env.NEXT_PUBLIC_TOUR_API_KEY}&_type=json&listYN=Y&arrange=O${contentTypeIdParam}${areaCodeParam}${sigunguCodeParam}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      const newItems = data.response.body.items.item;

      if (isNewSearch) {
        setApiData(newItems);
      } else {
        setApiData((prevItems) =>
          prevItems ? [...prevItems, ...newItems] : newItems
        );
      }

      if (newItems.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      alert('일치하는 결과가 없습니다.');
    }
  };

  const loader = useInfiniteScroll(hasMore, () =>
    setPage((prevPage) => prevPage + 1)
  );

  useEffect(() => {
    if (page >= 1) {
      fetchData(page);
    }
  }, [page]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSearch = async () => {
    setPage(0);
    setHasMore(true);
    scrollToTop();
    await fetchData(1, true);
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedAreaCode(null);
    setSelectedAreaName('');
    setSelectedSigunguCode(null);
    setSelectedSigunguName('');
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
    setPage(0);
    setHasMore(false);
  };

  useEffect(() => {
    fetchData(1, true); // 초기화면
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 z-10 flex w-full border-y border-gray-200 bg-white px-4 text-sm">
        <button
          type="button"
          onClick={handleReset}
          disabled={!apiData}
          className={`flex flex-col items-center justify-center bg-transparent px-4 py-2 text-xs ${!apiData ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:font-bold hover:text-[--brand-color]'}`}
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
            selectedAreaName={selectedAreaName}
            setSelectedAreaName={setSelectedAreaName}
            selectedSigunguName={selectedSigunguName}
            setSelectedSigunguName={setSelectedSigunguName}
          />
          <CategoryFilter
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            selectedCategoryName={selectedCategoryName}
            setSelectedCategoryName={setSelectedCategoryName}
          />
        </div>
        <div className="flex items-center">
          <SearchKeyword setKeyword={setKeyword} onSearch={handleSearch} />
        </div>
      </div>
      <div className="h-full w-full">
        {apiData && apiData.length ? (
          <div className="w-full overflow-y-auto">
            <PlacesList apiData={apiData} />
          </div>
        ) : (
          <div className="flex h-[calc(100vh-13rem)] w-full flex-col items-center justify-center">
            장소를 선택하거나 키워드를 입력 후 검색해주세요
          </div>
        )}
        <div ref={loader} className="h-1 bg-transparent" />
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
