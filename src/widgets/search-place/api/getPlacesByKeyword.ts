import { fetcher, KAKAO_LOCAL_URL } from '@/shared';
import { GetPlacesByKeywordResponseT } from '../types/keyword-type';

const getPlacesByKeyword = async (
  queryText: string
): Promise<GetPlacesByKeywordResponseT> => {
  try {
    const result = await fetcher(
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
    console.error('Error to get places by keyword:', error);
    throw new Error('Failed to get places by keyword');
  }
};

export default getPlacesByKeyword;
