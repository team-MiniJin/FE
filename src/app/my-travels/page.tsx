import { CreatingPlanButton } from '@/features';
import { MyPlans, UpcomingPlans } from '@/widgets';

export default function MyTravels() {
  return (
    <div className="mt-10">
      <div>
        <UpcomingPlans />
      </div>
      <div className="my-10 h-[1px] w-full border-t" />
      <div className="relative">
        <div className="absolute -top-4 right-0 ">
          <CreatingPlanButton />
        </div>

        <MyPlans />
      </div>
    </div>
  );
}
