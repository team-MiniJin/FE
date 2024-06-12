import { fetcher, KAKAO_LOCAL_URL } from '@/shared';
import { AxiosResponse } from 'axios';

const getPlacesByAddress = async (queryText: string) => {
  try {
    const result: AxiosResponse = await fetcher(
      KAKAO_LOCAL_URL,
      '/address',
      'get',
      {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY as string}`,
      },
      { query: queryText, size: 5, page: 1 }
    );
    return result.data;
  } catch (error) {
    throw new Error('Failed to get places by address');
  }
};

export default getPlacesByAddress;
