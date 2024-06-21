import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/shared';
import getCopiedPlan from '../api/getCopiedPlan';

const useCopyPlan = () => {
  const { jwt } = useAuth();
  return useMutation({
    mutationFn: (planId: number) => getCopiedPlan(planId, jwt as string),
  });
};

export default useCopyPlan;
