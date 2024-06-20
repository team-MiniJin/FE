import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosError, AxiosResponse } from 'axios';
import { DeletePlanResponseT } from '../type/plan-detail';

const deletePlan = async (
  plan_id: number,
  jwt: string
): Promise<DeletePlanResponseT> => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/plans/${plan_id}`,
      'delete',
      {
        Authorization: jwt,
      }
    );
    if (result.data.success === false) throw new Error(result.data.message);
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to delete plan: ${error.message}`);
    } else {
      throw new Error('Failed to delete plan');
    }
  }
};

export default deletePlan;
