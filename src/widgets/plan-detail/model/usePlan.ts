'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared';
import { fetchPlanDetail } from '../api/fetchPlanDetail';
import { PlanDetailT } from '../type/plan-detail';
import deletePlan from '../api/deletePlan';

export const usePlan = (plan_id: number) => {
  const { jwt } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<PlanDetailT>({
    queryKey: ['plan', plan_id],
    queryFn: () => fetchPlanDetail(plan_id, jwt as string),
  });

  const { mutate: mutateDeletePlan } = useMutation({
    mutationFn: (plan_id: number) => deletePlan(plan_id, jwt as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['plans'] });
      await queryClient.refetchQueries({ queryKey: ['plans'] });
      router.replace('/my-travels');
      await queryClient.invalidateQueries({ queryKey: ['plan', plan_id] });
    },
    onError: (error: any) => {
      console.error('Failed to delete plan:', error);
    },
  });

  return { data, isError, mutateDeletePlan, isLoading };
};
