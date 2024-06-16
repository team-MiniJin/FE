import { fetcher } from '@/shared';

const postCopiedPlan = async (planId: number) => {
  try {
    const result = await fetcher('', '', 'post', { planId: planId.toString() });
    return result.data;
  } catch (e) {
    throw new Error('Failed to post copied plan');
  }
};

export default postCopiedPlan;
