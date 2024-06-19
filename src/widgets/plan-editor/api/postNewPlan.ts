import { fetcher, TRAVEL_URL } from '@/shared';
import { PostNewPlanT } from '../types/plan-editor-type';

const postNewPlan = async (data: PostNewPlanT) => {
  try {
    const data = await fetcher(
      TRAVEL_URL,
      '/plans',
      'post',
      { 'Content-Type': 'application/json' },
      undefined,
      data
    );
    return data;
  } catch (error) {
    console.error('Error to post new plan:', error);
    throw new Error('Failed to post new plan');
  }
};

export default postNewPlan;
