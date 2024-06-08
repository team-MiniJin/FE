import { fetcher, KAKAO_LOCAL_URL } from '@/shared';
import { AxiosResponse } from 'axios';

const getPlacesByKeyword = async (queryText: string) => {
  try {
    const result: AxiosResponse = await fetcher(
      KAKAO_LOCAL_URL,
      '/keyword',
      'get',
      {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY as string}`,
      },
      { query: queryText, size: 5, page: 1 }
    );
    return result.data;
  } catch (error) {
    throw new Error('Failed to get places by keyword');
  }
};

export default getPlacesByKeyword;
