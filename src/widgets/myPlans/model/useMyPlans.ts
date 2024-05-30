import { useInfiniteQuery } from '@tanstack/react-query';
import {
  FetchMyPlanErrorT,
  FetchMyPlanSuccessT,
} from '@/widgets/myPlans/types/myPlans';
import fetchMyPlans from '@/widgets/myPlans/api/fetchMyPlans';

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
