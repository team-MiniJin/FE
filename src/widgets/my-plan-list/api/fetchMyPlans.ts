import { TRAVEL_URL } from '@/shared/constants/api';
import fetcher from '@/shared/utils/fetcher';
import { FetchMyPlanSuccessT } from '@/widgets/my-plan-list/types/myPlans';

const fetchMyPlans = async (
  pageParam: number
): Promise<FetchMyPlanSuccessT> => {
  try {
    const result = await fetcher(TRAVEL_URL, '/plans', 'get', undefined, {
      cursor_id: pageParam,
    });

    return result.data;
  } catch (error) {
    console.error('Error fetching my plans:', error);
    throw new Error('Failed to fetch my plans. Please try again later.');
  }
};

export default fetchMyPlans;
