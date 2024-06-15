import { PopularPlans, UserPlanList } from '@/widgets';

export default function Page() {
  return (
    <div>
      <PopularPlans />
      <div className="my-4 h-[1px] w-full border-b" />
      <UserPlanList />
    </div>
  );
}
