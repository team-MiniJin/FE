import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPlan from '@/widgets/create-plan/api/createPlan';
import { PlanT } from '@/widgets/create-plan/types/create-plan-type';

const useCreatePlan = (plan: PlanT) => {
  const queryClient = useQueryClient();
  const { data, status } = useMutation({
    mutationFn: () => createPlan(plan),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['plans'], exact: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'], exact: true });
    },
  });
  return { data, status };
};
export default useCreatePlan;
