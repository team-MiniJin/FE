import { useInfiniteQuery } from '@tanstack/react-query';
import getUserTravels from '../api/getUserTravels';
import { GetUserTravelPlanSuccessT, SortType } from '../types/user-travel-type';

const useUserTravels = (
  sort: SortType,
  region: string,
  theme: string,
  search: string
) => {
  return useInfiniteQuery<GetUserTravelPlanSuccessT>({
    queryKey: ['userTravels', sort, region, theme],
    queryFn: ({ pageParam = 0 }) => {
      const page = pageParam as number;
      return getUserTravels(page, sort, region, theme, search);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.nextCursor) return lastPage.nextCursor;
      return undefined;
    },
  });
};

export default useUserTravels;
