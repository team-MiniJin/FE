import { Button } from '@/components/ui/button';
import { ScheduleT } from '@/shared';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import Link from 'next/link';

export default function PlanSimpleView({
  schedules,
}: {
  schedules: ScheduleT[];
}) {
  return (
    <>
      <div className="h-[294px] w-full">
        <PolylineMap schedules={schedules} />
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
