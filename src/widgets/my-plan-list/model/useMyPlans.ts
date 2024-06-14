import { useInfiniteQuery } from '@tanstack/react-query';
import { FetchMyPlanSuccessT } from '@/widgets/my-plan-list/types/myPlans';
import fetchMyPlans from '@/widgets/my-plan-list/api/fetchMyPlans';

const useMyPlans = () => {
  return useInfiniteQuery<FetchMyPlanSuccessT | Error>({
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
