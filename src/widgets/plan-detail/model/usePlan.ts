'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPlanDetail } from '../api/fetchPlanDetail';
import { PlanDetailT } from '../type/plan-detail';
import deletePlan from '../api/deletePlan';

export const usePlan = (plan_id: number) => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<PlanDetailT>({
    queryKey: ['plan', plan_id],
    queryFn: () => fetchPlanDetail(plan_id),
  });

  const { mutate: mutateDeletePlan, isSuccess } = useMutation({
    mutationFn: (plan_id: number) => deletePlan(plan_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      queryClient.invalidateQueries({ queryKey: ['plan', plan_id] });
    },
    onError: (error: any) => {
      console.error('Failed to delete plan:', error);
    },
  });

  return { data, isError, mutateDeletePlan, isLoading, isSuccess };
};
