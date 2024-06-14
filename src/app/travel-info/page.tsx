'use client';

import { useState, useRef, useEffect } from 'react';
import {
  SearchKeyword,
  PlacesList,
  AreaFilter,
  CategoryFilter,
} from '@/widgets';
import { PlaceT } from '@/widgets/travel-info/types/Place';

export default function TravelInfo() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedAreaCode, setSelectedAreaCode] = useState<number | null>(null);
  const [selectedSigunguCode, setSelectedSigunguCode] = useState<number | null>(
    null
  );

  const [apiData, setApiData] = useState<PlaceT[] | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleCategorySelect = (contentTypeId: number | null) => {
    setSelectedCategoryId(contentTypeId);
  };
  const handleAreaSelect = (areaCode: number | null) => {
    setSelectedAreaCode(areaCode);
  };
  const handleSigunguSelect = (sigunguCode: number | null) => {
    setSelectedSigunguCode(sigunguCode);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSearch = async (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(0);
    setHasMore(true);
    scrollToTop();
    await fetchData(1, true);
  };

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

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loader.current) observer.current.observe(loader.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const handleReset = () => {
    setKeyword('');
    setApiData(null);
    setPage(0);
    setHasMore(false);
    setSelectedCategoryId(null);
    setSelectedCategoryName('');
  };

  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 z-10 flex w-full border-y border-gray-200 bg-white px-4 text-sm">
        <button
          type="button"
          onClick={handleReset}
          disabled={!apiData || apiData.length === 0}
          className={`bg-transparent px-4 py-2 ${!apiData || apiData.length === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:font-bold hover:text-[--brand-color]'}`}
        >
          선택초기화
        </button>
        <div className="flex-1 space-y-4 py-4">
          <AreaFilter
            onAreaSelect={handleAreaSelect}
            onSigunguSelect={handleSigunguSelect}
          />
          <CategoryFilter
            onCategorySelect={handleCategorySelect}
            selectedCategoryName={selectedCategoryName}
            setSelectedCategoryName={setSelectedCategoryName}
          />
        </div>
        <SearchKeyword
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
        />
      </div>
      <div className="h-full w-full">
        {apiData && apiData.length ? (
          <div className="w-1/2 overflow-y-auto">
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
