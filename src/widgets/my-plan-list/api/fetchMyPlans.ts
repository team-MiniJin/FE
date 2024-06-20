import { TRAVEL_URL } from '@/shared/constants/api';
import fetcher from '@/shared/utils/fetcher';
import { FetchMyPlanSuccessT } from '../types/my-plan-type';

const fetchMyPlans = async (
  pageParam: number,
  jwt: string
): Promise<FetchMyPlanSuccessT> => {
  try {
    const result = await fetcher(
      TRAVEL_URL,
      '/plans',
      'get',
      { Authorization: jwt },
      {
        cursor_id: pageParam,
      }
    );

    return result.data;
  } catch (error) {
    console.error('Error fetching my plans:', error);
    throw new Error('Failed to fetch my plans. Please try again later.');
  }
};

export default fetchMyPlans;
