import { useInfiniteQuery } from '@tanstack/react-query';
import { fetcher, TRAVEL_URL } from '@/shared';

const getMyScraps = async (pageParam: number): Promise<any> => {
  try {
    const jwt = localStorage.getItem('jwt');
    const response = await fetcher(
      TRAVEL_URL,
      `/scraps`,
      'get',
      {
        'Content-Type': 'application/json',
        Authorization: jwt || '',
      },
      {
        cursor_id: pageParam,
      }
    );
    return response.data;
  } catch (error) {
    console.error('에러', error);
    throw new Error('Failed to fetch user travels');
  }
};

const useMyScraps = () => {
  return useInfiniteQuery<any>({
    queryKey: ['scraps'],
    queryFn: ({ pageParam = 0 }) => {
      const page = pageParam as number;
      return getMyScraps(page);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.next_cursor) return lastPage.next_cursor;
      return undefined;
    },
  });
};

export default useMyScraps;
