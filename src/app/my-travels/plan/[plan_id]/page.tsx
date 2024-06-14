import { BackLink } from '@/shared';
import PlanDetail from '@/widgets/plan-detail/ui/PlanDetail';

export default function Page({ params }: { params: { plan_id: number } }) {
  return (
    <div className="relative">
      <div className="absolute -left-2 inline-block">
        <BackLink />
      </div>
      <div className="pt-6">
        <PlanDetail plan_id={params.plan_id} />
      </div>
    </div>
  );
}
