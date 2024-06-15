'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceT, PlaceDetailT } from '@/widgets/travel-info/types/Place';
import { KakaoMap } from '@/shared';

interface PlacesListProps {
  apiData: PlaceT[] | null;
}

export default function PlacesList({ apiData }: PlacesListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailedData, setDetailedData] = useState<
    Record<number, PlaceDetailT | null>
  >({});

  const handleToggle = async (contentId: number) => {
    if (expandedId === contentId) {
      setExpandedId(null);
    } else {
      setExpandedId(contentId);
      if (!detailedData[contentId]) {
        try {
          const url = `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${process.env.NEXT_PUBLIC_TOUR_API_KEY}&contentId=${contentId}&MobileOS=ETC&MobileApp=APPTest&_type=json&defaultYN=Y&firstImageYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setDetailedData((prevData) => ({
            ...prevData,
            [contentId]: data.response.body.items.item[0],
          }));
        } catch (error) {
          console.error('Error fetching detail data:', error);
        }
      }
    }
  };

  return (
    <section className="space-y-4">
      {apiData &&
        apiData.map((place: PlaceT) => (
          <div
            key={place.contentid}
            className="group flex w-full cursor-pointer flex-col border-t border-gray-200"
          >
            <button
              type="button"
              className="flex w-full text-left"
              onClick={() => handleToggle(place.contentid)}
            >
              <figure className="relative m-4 flex h-44 w-44 items-center justify-center">
                {place.firstimage ? (
                  <div
                    className="relative overflow-hidden"
                    style={{ width: '176px', height: '100%' }}
                  >
                    <Image
                      className="group-hover:scale-110"
                      src={place.firstimage}
                      alt={place.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 176px"
                      style={{
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    />
                  </div>
                ) : (
                  <div className="h-44 w-44 bg-gray-200 text-center leading-[11rem]">
                    no image
                  </div>
                )}
              </figure>
              <article className="m-4 flex flex-col">
                <header className="text-lg font-bold group-hover:text-[--brand-color]">
                  {place.title}
                </header>
                <p className="text-base font-normal">
                  {place.addr1}
                  {place.addr2}
                </p>
              </article>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedId === place.contentid
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {expandedId === place.contentid &&
                detailedData[place.contentid] !== null && (
                  <div className="space-y-4 rounded-md bg-gray-100 p-4">
                    {detailedData[place.contentid]?.homepage && (
                      <article>
                        <h3 className="text-base font-bold hover:text-[#3666FF]">
                          <a
                            href={
                              detailedData[place.contentid]?.homepage.split(
                                '"'
                              )[1]
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            홈페이지
                          </a>
                        </h3>
                      </article>
                    )}
                    {detailedData[place.contentid]?.tel && (
                      <article>
                        <h3 className="text-base font-bold">전화</h3>
                        <p>{detailedData[place.contentid]?.tel}</p>
                      </article>
                    )}
                    {detailedData[place.contentid]?.overview && (
                      <article className="space-y-2">
                        <h3 className="text-base font-bold">상세정보</h3>
                        {detailedData[place.contentid]?.overview
                          .split(/<br\s*\/?>/i)
                          .map((p, i) => <p key={i}>{p}</p>)}
                      </article>
                    )}
                    {detailedData[place.contentid]?.mapx && (
                      <article className="fixed left-[50%] top-20 h-full w-1/2 max-w-[512px] pr-8">
                        <KakaoMap
                          mapx={detailedData[place.contentid]?.mapx}
                          mapy={detailedData[place.contentid]?.mapy}
                          title={detailedData[place.contentid]?.title}
                        />
                      </article>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
    </section>
  );
}
