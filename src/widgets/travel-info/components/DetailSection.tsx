import { PlaceDetailT } from '@/widgets/travel-info/types/Place';
import Image from 'next/image';

interface DetailSectionProps {
  data: PlaceDetailT | null;
}

export default function DetailSection({ data }: DetailSectionProps) {
  if (!data) {
    return <div>No data available</div>;
  }
  const homepageURL = data.homepage.split('"')[1];

  return (
    <div className="space-y-4 p-6">
      <div className="relative h-52 w-full">
        <Image
          className="h-full w-full object-contain"
          src={data.firstimage}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            transition: 'transform 0.3s ease',
          }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      </div>
      <h2 className="w-full text-xl font-bold">{data.title}</h2>
      <div className="w-full">
        <h3 className="text-base font-bold">주소</h3>
        <div>{data.addr1}</div>
        <div>{data.addr2}</div>
      </div>
      <a
        href={homepageURL}
        target="_blank"
        className="mt-2 block w-full underline hover:text-[#3666FF]"
      >
        홈페이지
      </a>
      <div className="w-full">
        <h3 className="text-base font-bold">{data.telname}</h3>
        <div className="mt-2">{data.tel}</div>
      </div>
      <div className="w-full">
        <h3 className="text-base font-bold">상세정보</h3>
        <p className="mt-2">{data.overview}</p>
      </div>
    </div>
  );
}
