import { fetcher, MOCK_SERVER_URL, TRAVEL_URL } from '@/shared';
import { GetUserTravelPlanSuccessT } from '../types/user-travel-type';

const getUserTravels = async (
  pageParam: number,
  sort: string,
  region: string,
  theme: string,
  search: string
): Promise<GetUserTravelPlanSuccessT> => {
  try {
    const result = await fetcher(
      TRAVEL_URL,
      `/plans/others/${sort}`,
      'get',
      undefined,
      {
        cursor_id: pageParam,
        theme: theme === 'all' ? '' : theme,
        region: region === 'all' ? '' : region,
        // search,
      }
    );
    return result.data;
  } catch (error) {
    console.error('Failed to fetch user travels: ', error);
    throw new Error('Failed to fetch user travels');
  }
};

export default getUserTravels;
