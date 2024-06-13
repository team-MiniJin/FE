import PlanDetail from '@/widgets/plan-detail/ui/PlanDetail';

export default function Page({ params }: { params: { plan_id: number } }) {
  return (
    <div className="relative">
      <PlanDetail plan_id={params.plan_id} />
    </div>
  );
}
