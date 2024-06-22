import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosResponse } from 'axios';

export const fetchPlanDetail = async (
  planId: number,
  jwt: string,
  isMyPlan: boolean
) => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      isMyPlan ? `/plans/details/${planId}` : `/plans/others/${planId}`,
      'get',
      isMyPlan
        ? {
            Authorization: jwt,
          }
        : undefined
    );
    return result.data;
  } catch (error) {
    throw new Error('Failed to fetch plan by plan_id');
  }
};
