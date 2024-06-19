'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchPlanDetail } from '../api/fetchPlanDetail';
import { PlanDetailT } from '../type/plan-detail';
import deletePlan from '../api/deletePlan';

export const usePlan = (plan_id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isError } = useQuery<PlanDetailT>({
    queryKey: ['plan', plan_id],
    queryFn: () => fetchPlanDetail(plan_id),
  });

  const { mutate: mutateDeletePlan } = useMutation({
    mutationFn: (plan_id: number) => deletePlan(plan_id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['plans'] });
      await queryClient.invalidateQueries({ queryKey: ['plan', plan_id] });
      router.push('/my-travels');
    },
    onError: (error: any) => {
      // 삭제 실패 시 처리
      console.error('Failed to delete plan:', error);
    },
  });

  return { data, isError, mutateDeletePlan };
};
