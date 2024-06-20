'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchPlanDetail } from '../api/fetchPlanDetail';
import { PlanDetailT } from '../type/plan-detail';
import deletePlan from '../api/deletePlan';

export const usePlan = (plan_id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<PlanDetailT>({
    queryKey: ['plan', plan_id],
    queryFn: () => fetchPlanDetail(plan_id),
  });

  const { mutate: mutateDeletePlan } = useMutation({
    mutationFn: (plan_id: number) => deletePlan(plan_id),
    onSuccess: async () => {
      console.log('성공');
      await queryClient.invalidateQueries({ queryKey: ['plans'] });
      await queryClient.invalidateQueries({ queryKey: ['plan', plan_id] });
      await queryClient.refetchQueries({ queryKey: ['plans'] });
      router.push('/my-travels');
      console.log('성공!');
    },
    onError: (error: any) => {
      console.log('실패!');
      console.error('Failed to delete plan:', error);
    },
  });

  return { data, isError, mutateDeletePlan, isLoading };
};
