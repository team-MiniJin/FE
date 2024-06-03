import fetcher from '@/shared/utils/fetcher';
import { AxiosResponse } from 'axios';
import { UpcomingPlanT } from '@/widgets/upcoming-plan-list/types/upcomingPlan';

const fetchUpcomingPlans = async (): Promise<UpcomingPlanT[]> => {
  try {
    const result: AxiosResponse = await fetcher('/plans/upcoming', 'get');
    return result.data as UpcomingPlanT[];
  } catch (error) {
    throw new Error('Failed to fetch upcoming plans');
  }
};

export default fetchUpcomingPlans;
