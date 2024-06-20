import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuth } from '@/shared';
import { FetchMyPlanSuccessT } from '../types/my-plan-type';
import fetchMyPlans from '../api/fetchMyPlans';

const useMyPlans = () => {
  const { jwt } = useAuth();
  return useInfiniteQuery<FetchMyPlanSuccessT | Error>({
    queryKey: ['plans'],
    queryFn: ({ pageParam = 0 }) =>
      fetchMyPlans(pageParam as number, jwt as string),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if ('next_cursor' in lastPage) return lastPage.next_cursor;
      return undefined;
    },
    staleTime: 0,
  });
};

export default useMyPlans;
