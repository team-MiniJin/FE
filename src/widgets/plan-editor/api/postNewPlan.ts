import { fetcher, TRAVEL_URL } from '@/shared';
import { PostNewPlanT } from '../types/plan-editor-type';

const postNewPlan = async (data: PostNewPlanT) => {
  try {
    const result = await fetcher(
      TRAVEL_URL,
      '/plans',
      'post',
      { 'Content-Type': 'application/json' },
      undefined,
      data
    );
    console.log(result);
  } catch (error) {
    console.error('Failed to post new plan:', error);
  }
};

export default postNewPlan;
