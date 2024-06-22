import { fetcher, TRAVEL_URL } from '@/shared';
import { AxiosError, AxiosResponse } from 'axios';
import { DeleteBookmarkResponseT } from '../type/plan-detail';

const deleteBookmark = async (
  plan_id: number,
  jwt: string
): Promise<DeleteBookmarkResponseT> => {
  try {
    const result: AxiosResponse = await fetcher(
      TRAVEL_URL,
      `/scraps/${plan_id}`,
      'delete',
      {
        Authorization: jwt,
      }
    );
    if (result.data.success === false) throw new Error(result.data.message);
    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to delete bookmark: ${error.message}`);
    } else {
      throw new Error('Failed to delete bookmark');
    }
  }
};

export default deleteBookmark;
