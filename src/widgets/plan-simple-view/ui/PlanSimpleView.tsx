import { Button } from '@/components/ui/button';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import Link from 'next/link';

export default function PlanSimpleView({
  coordinates,
}: {
  coordinates: [number, number][];
}) {
  return (
    <>
      <div className="h-[294px] w-full">
        <PolylineMap coordinates={coordinates} />
      </div>
      <Button
        asChild
        className="absolute right-0 top-0 z-10 bg-[--brand-main-color] hover:bg-[--brand-color-hover]"
      >
        <Link href="/">자세히 보기</Link>
      </Button>
    </>
  );
}
