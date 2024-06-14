import { Button } from '@/components/ui/button';
import { MyPlanScheduleT } from '@/widgets/my-plan-list/types/myPlans';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import Link from 'next/link';

export default function PlanSimpleView({
  coordinates,
  schedules,
}: {
  coordinates: [number, number][];
  schedules: MyPlanScheduleT[];
}) {
  return (
    <>
      <div className="h-[294px] w-full">
        <PolylineMap coordinates={coordinates} schedules={schedules} />
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
