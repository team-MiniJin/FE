import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosError, AxiosResponse } from 'axios';
import { PostNewPlanT } from '../types/plan-editor-type';

const putPlan = async (data: PostNewPlanT, plan_id: number, jwt: string) => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/plans/${plan_id}`,
      'put',
      {
        Authorization: jwt,
        'Content-Type': 'application/json',
      },
      undefined,
      data
    );
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to put plan: ${error.message}`);
    } else {
      throw new Error('Failed to put plan');
    }
  }
};

export default putPlan;
