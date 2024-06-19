import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosResponse } from 'axios';

export const fetchPlanDetail = async (planId: number) => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/plans/details/${planId}`,
      'get',
      undefined
    );
    return result.data;
  } catch (error) {
    throw new Error('Failed to fetch plan by plan_id');
  }
};
