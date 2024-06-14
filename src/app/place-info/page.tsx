'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterArea, DetailSection, Map } from '@/widgets';
import { PlaceDetailT } from '@/widgets/travel-info/types/Place';

export default function PlaceInfo() {
  const searchParams = useSearchParams();
  const contentId = searchParams.get('contentid');

  const ENCODING_KEY =
    'NGVffsMvyiv72RIfJIaWX8uyRc%2FREwo2VnS3vrzTPvmub0BAAomblyPiOekyEE6%2FS9eSn%2BOK2P2CWaFStEfr7A%3D%3D';

  const [data, setData] = useState<PlaceDetailT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contentId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://apis.data.go.kr/B551011/KorService1/detailCommon1?&MobileOS=ETC&MobileApp=APPTest&serviceKey=${ENCODING_KEY}&_type=json&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`
        );

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        setData(result.response.body.items.item[0]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentId, ENCODING_KEY]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 z-10 w-full border-y border-gray-200 bg-white">
        {/* <FilterArea /> */}
      </div>
      <div className="flex w-full">
        <div className="w-1/2">
          <DetailSection data={data} />
        </div>
        <div className="fixed left-[50%] top-24 w-[calc(50%-2rem)]">
          <Map />
        </div>
      </div>
    </div>
  );
}
