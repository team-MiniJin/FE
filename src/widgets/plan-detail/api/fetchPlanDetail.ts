import { fetcher, MOCK_SERVER_URL } from '@/shared';
import { AxiosResponse } from 'axios';

export const fetchPlanDetail = async (planId: number) => {
  try {
    const result: AxiosResponse = await fetcher(
      MOCK_SERVER_URL,
      `/plans`,
      'get',
      undefined,
      { plan_id: planId }
    );
    return result.data;
  } catch (error) {
    throw new Error('Failed to fetch plan by plan_id');
  }
};
