'use client';

import { useInfiniteScroll } from '@/shared';
import useMyPlans from '@/widgets/my-plan-list/model/useMyPlans';
import { useEffect } from 'react';
import MyPlan from './MyPlan';
import { MyPlanT } from '../types/myPlans';

export default function MyPlans() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useMyPlans();
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage && !isFetching) fetchNextPage();
  }, hasNextPage);
  useEffect(() => {
    if (!document.getElementById('kakao-map-script')) {
      const mapScript = document.createElement('script');
      mapScript.id = 'kakao-map-script';
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer,drawing&autoload=false`;
      document.head.appendChild(mapScript);
    }
  }, []);

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
              page.data.map((plan: MyPlanT) => (
                <MyPlan key={plan.plan_id} plan={plan} />
              ))
          )}
        </ul>
        <div ref={observerRef} />
        {isFetchingNextPage && <p>더 가져오는 중...</p>}
        {!hasNextPage && !isFetching && <p>더 가져올게 없습니다!</p>}
        {isFetching && !isFetchingNextPage && <p>초기 데이터 가져오는 중...</p>}
      </div>
    </div>
  );
}
