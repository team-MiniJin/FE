'use client';

import { useInfiniteScroll } from '@/shared';
import useUserTravels from '../model/useUserTravels';
import useTravelFilterAndSortStore from '../store/useTravelFilterAndSortStore';
import { UserTravelPlanT } from '../types/user-travel-type';
import UserTravel from './user-travels/UserTravel';

export default function UserTravels() {
  const { sort, region, theme, search } = useTravelFilterAndSortStore();
  const { data, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage } =
    useUserTravels(sort, region as string, theme as string, search);
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage && !isFetching) fetchNextPage();
  }, hasNextPage);

  return (
    <div className="mt-[16px]">
      <ul>
        {data?.pages.map(
          (page) =>
            'data' in page &&
            page.data.map((plan: UserTravelPlanT) => (
              <UserTravel key={plan.plan_id} plan={plan} />
            ))
        )}
      </ul>
      <div ref={observerRef} />
      {isFetchingNextPage && <p>더 가져오는 중...</p>}
      {!hasNextPage && !isFetching && <p>더 가져올게 없습니다!</p>}
      {isFetching && !isFetchingNextPage && <p>초기 데이터 가져오는 중...</p>}
    </div>
  );
}
