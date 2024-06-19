import { fetcher } from '@/shared';
import { GetPlacesByAddressResponseT } from '../types/address-type';

const getPlacesByAddress = async (
  queryText: string
): Promise<GetPlacesByAddressResponseT> => {
  try {
    const result = await fetcher(
      'https://dapi.kakao.com/v2/local/search',
      '/address',
      'get',
      {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY as string}`,
      },
      { query: queryText, size: 5, page: 1 }
    );

    return result.data;
  } catch (error) {
    console.error('Error to get places by address:', error);
    throw new Error('Failed to get places by address');
  }
};

export default getPlacesByAddress;
