import { fetcher, TRAVEL_URL } from '@/shared';
import { PopularPlanT } from '../types/popular-plan-type';

const getPopularPlans = async (): Promise<PopularPlanT[]> => {
  try {
    const result = await fetcher(TRAVEL_URL, '/plans/popular/week', 'get');

    return result.data;
  } catch (error) {
    console.error('Error fetching Popular plans:', error);
    throw new Error('Failed to fetch Popular plans. Please try again later.');
  }
};
export default getPopularPlans;
