import { MyPlans, UpcomingPlans } from '@/widgets';

export default function MyTravels() {
  return (
    <div className="mt-10">
      <div>
        <UpcomingPlans />
      </div>
      <div className="my-10 h-[1px] w-full border-t" />
      <div>
        <MyPlans />
      </div>
    </div>
  );
}
