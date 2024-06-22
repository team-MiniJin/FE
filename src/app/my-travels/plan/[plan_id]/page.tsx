'use client';

import { Loading, useAuth } from '@/shared';
import PlanDetail from '@/widgets/plan-detail/ui/PlanDetail';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: { params: { plan_id: number } }) {
  const router = useRouter();
  const { isLoading: isAuthLoading, jwt } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !jwt) {
      router.push('/login');
    }
  }, [isAuthLoading, jwt, router]);

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!jwt) {
    return null;
  }

  return (
    <div className="relative">
      <PlanDetail planId={params.plan_id} isMyPlan />
    </div>
  );
}
