import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosResponse } from 'axios';
import { CopiedPlanResponseT } from '../type/plan-detail';

const getCopiedPlan = async (
  planId: number,
  jwt: string
): Promise<CopiedPlanResponseT> => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/plans/copy/${planId}`,
      'get',
      {
        Authorization: jwt,
      }
    );
    return result.data;
  } catch (e) {
    console.error('Error posting copied plan:', e);
    throw new Error('Failed to post copied plan. Please try again later.');
  }
};

export default getCopiedPlan;
