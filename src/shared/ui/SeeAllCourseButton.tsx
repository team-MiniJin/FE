import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import { MyPlanScheduleT } from '@/widgets/my-plan-list/types/my-plan-type';

export default function SeeAllCourseButton({
  schedules,
}: {
  schedules: MyPlanScheduleT[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">여행 코스 전체보기</Button>
      </DialogTrigger>
      <DialogContent className="h-[90%] w-[90%] ">
        <div className="h-[100%] w-[100%] p-4">
          <PolylineMap schedules={schedules} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
