import { useInfiniteQuery } from '@tanstack/react-query';
import fetchMyPlans from '@/widgets/my-travels/api/fetchMyPlans';
import {
  FetchMyPlanErrorT,
  FetchMyPlanSuccessT,
} from '@/widgets/my-travels/types/plan';

const useMyPlans = () => {
  return useInfiniteQuery<FetchMyPlanSuccessT | FetchMyPlanErrorT | Error>({
    queryKey: ['plans'],
    queryFn: ({ pageParam = 1 }) => fetchMyPlans(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // console.log(lastPage.nextCursor);
      if ('nextCursor' in lastPage) return lastPage.nextCursor;
      return undefined;
    },
  });
};

export default useMyPlans;
