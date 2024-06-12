'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPlanDetail } from '../api/fetchPlanDetail';
import { PlanDetailT } from '../type/plan-detail';

export const usePlan = (plan_id: number) => {
  return useQuery<PlanDetailT>({
    queryKey: ['plan', plan_id],
    queryFn: () => fetchPlanDetail(plan_id),
  });
};
