import { Button } from '@/components/ui/button';
import { MyPlanScheduleT } from '@/widgets/my-plan-list/types/my-plan-type';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PlanSimpleView({
  planId,
  schedules,
}: {
  planId: number;
  schedules: MyPlanScheduleT[];
}) {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1] || '';

  return (
    <>
      <div className="h-[294px] w-full">
        <PolylineMap schedules={schedules} />
      </div>
      <Button
        asChild
        className="absolute right-0 top-0 z-10 bg-[--brand-main-color] hover:bg-[--brand-color-hover]"
      >
        <Link
          href={`${(basePath !== '' && '/' && basePath) || ''}/plan/${planId}`}
        >
          자세히 보기
        </Link>
      </Button>
    </>
  );
}
