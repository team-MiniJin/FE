import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosResponse } from 'axios';

export const fetchPlanDetail = async (planId: number, jwt: string) => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/plans/details/${planId}`,
      'get',
      {
        Authorization: jwt,
      }
    );
    return result.data;
  } catch (error) {
    throw new Error('Failed to fetch plan by plan_id');
  }
};
