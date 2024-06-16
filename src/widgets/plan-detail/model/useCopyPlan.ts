import { useMutation } from '@tanstack/react-query';
import postCopiedPlan from '../api/postCopiedPlan';

const useCopyPlan = () => {
  return useMutation({
    mutationFn: (planId: number) => postCopiedPlan(planId),
  });
};

export default useCopyPlan;
