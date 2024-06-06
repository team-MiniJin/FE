import Link from 'next/link';
import Image from 'next/image';
import { PlaceT } from '@/widgets/travel-info/types/Place';

export default function PlacesList({ apiData }: { apiData: PlaceT[] | null }) {
  return (
    <section className="space-y-4">
      {apiData &&
        apiData.map((place: PlaceT) => (
          <div
            key={place.contentid}
            className="group flex h-52 w-full border-t border-gray-200"
          >
            <figure className="relative m-4 flex h-44 w-44 items-center justify-center">
              {place.firstimage2 ? (
                <div
                  className="relative overflow-hidden"
                  style={{ width: '176px', height: '100%' }}
                >
                  <Image
                    className="group-hover:scale-110"
                    src={place.firstimage2}
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
              <Link href="/place-info">
                <header className="text-lg font-bold hover:underline">
                  {place.title}
                </header>
                <p className="text-base font-normal hover:underline">
                  {place.addr1}
                </p>
              </Link>
            </article>
          </div>
        ))}
    </section>
  );
}
