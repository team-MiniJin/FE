import PlanDetail from '@/widgets/plan-detail/ui/PlanDetail';

export default function Page({ params }: { params: { planId: number } }) {
  return (
    <div className="relative">
      <PlanDetail planId={params.planId} isMyPlan={false} />
    </div>
  );
}
