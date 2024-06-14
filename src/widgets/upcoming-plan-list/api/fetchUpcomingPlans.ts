import fetcher from '@/shared/utils/fetcher';
import { AxiosResponse } from 'axios';
import { MOCK_SERVER_URL } from '@/shared/constants/api';
import { UpcomingPlanT } from '../types/upcomingPlan';

const fetchUpcomingPlans = async (): Promise<UpcomingPlanT[]> => {
  try {
    const result: AxiosResponse = await fetcher(
      MOCK_SERVER_URL,
      '/plans/upcoming',
      'get'
    );
    return result.data as UpcomingPlanT[];
  } catch (error) {
    throw new Error('Failed to fetch upcoming plans');
  }
};

export default fetchUpcomingPlans;
