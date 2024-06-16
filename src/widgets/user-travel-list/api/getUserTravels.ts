import { fetcher, MOCK_SERVER_URL } from '@/shared';
import { AxiosResponse } from 'axios';
import { GetUserTravelPlanSuccessT } from '../types/user-travel-type';

const getUserTravels = async (
  pageParam: number,
  sort: string,
  region: string,
  theme: string,
  search: string
): Promise<GetUserTravelPlanSuccessT> => {
  try {
    const result: AxiosResponse = await fetcher(
      MOCK_SERVER_URL,
      `/plans/others/${sort}`,
      'get',
      undefined,
      {
        cursor: pageParam,
        theme,
        region,
        search,
      }
    );
    return result.data as GetUserTravelPlanSuccessT;
  } catch (error) {
    throw new Error('Failed to fetch user travels');
  }
};

export default getUserTravels;