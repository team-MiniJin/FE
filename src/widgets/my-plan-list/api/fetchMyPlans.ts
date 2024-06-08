import { MOCK_SERVER_URL } from '@/shared/constants/api';
import fetcher from '@/shared/utils/fetcher';
import { FetchMyPlanSuccessT } from '@/widgets/my-plan-list/types/myPlans';
import { AxiosResponse } from 'axios';

const fetchMyPlans = async (
  pageParam: number
): Promise<FetchMyPlanSuccessT> => {
  try {
    const result: AxiosResponse = await fetcher(
      MOCK_SERVER_URL,
      '/plans',
      'get',
      undefined,
      {
        cursor: pageParam,
      }
    );
    return result.data as FetchMyPlanSuccessT;
  } catch (error) {
    throw new Error('Failed to fetch my plans');
  }
};

export default fetchMyPlans;
