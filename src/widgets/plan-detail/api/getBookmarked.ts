import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosResponse } from 'axios';

interface GetBookmarkedResponseT {
  message: string;
  success: boolean;
}
const getBookmarked = async (
  planId: number,
  jwt: string
): Promise<GetBookmarkedResponseT> => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/scraps/check/${planId}`,
      'get',
      {
        Authorization: jwt,
      }
    );
    return result.data;
  } catch (e) {
    console.error('Error getting bookmark:', e);
    throw new Error('Failed to get bookmark. Please try again later.');
  }
};
export default getBookmarked;
