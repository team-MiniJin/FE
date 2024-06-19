import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchMyPlanSuccessT } from '../types/my-plan-type';
import fetchMyPlans from '../api/fetchMyPlans';

const useMyPlans = () => {
  return useInfiniteQuery<FetchMyPlanSuccessT | Error>({
    queryKey: ['plans'],
    queryFn: ({ pageParam = 0 }) => fetchMyPlans(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if ('next_cursor' in lastPage) return lastPage.next_cursor;
      return undefined;
    },
  });
};

export default useMyPlans;
