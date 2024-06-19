import fetcher from '@/shared/utils/fetcher';
import { TRAVEL_URL } from '@/shared/constants/api';
import { UpcomingPlanT } from '../types/upcoming-plan-type';

const fetchUpcomingPlans = async (): Promise<UpcomingPlanT[]> => {
  try {
    const result = await fetcher(TRAVEL_URL, '/plans/upcoming', 'get');

    return result.data;
  } catch (error) {
    console.error('Error fetching upcoming plans:', error);
    throw new Error('Failed to fetch upcoming plans. Please try again later.');
  }
};

export default fetchUpcomingPlans;
