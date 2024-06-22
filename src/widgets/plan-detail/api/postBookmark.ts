import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosResponse } from 'axios';
import { PostBookmarkResponseT } from '../type/plan-detail';

const postBookmark = async (
  planId: number,
  jwt: string
): Promise<PostBookmarkResponseT> => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/scraps/${planId}`,
      'post',
      {
        Authorization: jwt,
      }
    );
    return result.data;
  } catch (error) {
    console.error('Error to post bookmark:', error);
    throw new Error('Failed to post bookmark');
  }
};

export default postBookmark;
