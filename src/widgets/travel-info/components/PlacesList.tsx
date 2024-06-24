'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceInfoT } from '@/widgets/travel-info/types/Place';
import { KakaoMap } from '@/shared';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';

interface PlacesListProps {
  apiData: PlaceInfoT[] | null;
}

export default function PlacesList({ apiData }: PlacesListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = async (contentId: number) => {
    if (expandedId === contentId) {
      setExpandedId(null);
    } else {
      setExpandedId(contentId);
    }
  };

  return (
    <section className="space-y-4">
      {apiData &&
        apiData.map((place: PlaceInfoT) => (
          <div
            key={place.contentid}
            className="group flex w-full cursor-pointer flex-col border-t border-gray-200"
          >
            <button
              type="button"
              className="flex w-1/2 text-left"
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
              className={`w-1/2 overflow-hidden transition-all duration-500 ease-in-out ${
                expandedId === place.contentid
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {expandedId === place.contentid && (
                <div className="space-y-4 rounded-md bg-gray-100 p-4">
                  {place.homepage && (
                    <article>
                      <h3 className="text-base font-bold hover:text-[#3666FF]">
                        <Link
                          href={place.homepage.split('"')[1] || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex"
                        >
                          홈페이지
                          <AiOutlineHome className="ml-2" size={24} />
                        </Link>
                      </h3>
                    </article>
                  )}
                  {place.tel && (
                    <article>
                      <h3 className="text-base font-bold">전화</h3>
                      <p>{place.tel}</p>
                    </article>
                  )}
                  {place.overview && (
                    <article className="space-y-2">
                      <h3 className="text-base font-bold">상세정보</h3>
                      {place.overview.split(/<br\s*\/?>/i).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </article>
                  )}
                  {place.mapx && (
                    <article className="fixed left-[50%] top-20 h-full w-1/2 max-w-[512px] pl-2 pr-8">
                      <KakaoMap
                        mapx={place.mapx}
                        mapy={place.mapy}
                        title={place.title}
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
