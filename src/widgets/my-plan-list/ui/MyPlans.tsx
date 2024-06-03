'use client';

import { useInfiniteScroll } from '@/shared';
import useMyPlans from '@/widgets/my-plan-list/model/useMyPlans';
import MyPlan from './MyPlan';

export default function MyPlans() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useMyPlans();
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage && !isFetching) fetchNextPage();
  }, hasNextPage);
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">나의 여행 일정</h2>
      </div>
      <div>
        <ul>
          {data?.pages.map(
            (page) =>
              'data' in page &&
              page.data.map((plan) => <MyPlan key={plan.plan_id} plan={plan} />)
          )}
        </ul>
        <div ref={observerRef} />
        {isFetchingNextPage && <p>더 가져오는 중...</p>}
        {!hasNextPage && <p>더 가져올게 없습니다!</p>}
        {isFetching && !isFetchingNextPage && <p>초기 데이터 가져오는 중...</p>}
      </div>
    </div>
  );
}
