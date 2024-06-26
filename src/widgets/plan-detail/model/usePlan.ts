'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared';
import { fetchPlanDetail } from '../api/fetchPlanDetail';
import { PlanDetailT } from '../type/plan-detail';
import deletePlan from '../api/deletePlan';

export const usePlan = (plan_id: number, isMyPlan: boolean) => {
  const { jwt } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<PlanDetailT>({
    queryKey: ['plan', plan_id],
    queryFn: () => fetchPlanDetail(plan_id, jwt as string, isMyPlan),
  });

  const { mutate: mutateDeletePlan } = useMutation({
    mutationFn: (plan_id: number) => deletePlan(plan_id, jwt as string),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['plans'] });
      router.replace('/my-travels');

      await queryClient.refetchQueries({ queryKey: ['plan', plan_id] });
      await queryClient.refetchQueries({ queryKey: ['upcomingPlans'] });
      await queryClient.refetchQueries({ queryKey: ['popularPlans'] });
    },
    onError: (error: any) => {
      console.error('Failed to delete plan:', error);
    },
  });

  return { data, isError, mutateDeletePlan, isLoading };
};
