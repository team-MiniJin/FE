'use client';

import { PiSpinnerGapLight } from 'react-icons/pi';
import { useInfiniteScroll } from '@/shared';
import useMyPlans from '@/widgets/my-plan-list/model/useMyPlans';
import { Skeleton } from '@/components/ui/skeleton';
import MyPlan from './MyPlan';
import { MyPlanT } from '../types/my-plan-type';

export default function MyPlans() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
  } = useMyPlans();
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage && !isFetching) fetchNextPage();
  }, hasNextPage);
  if (isError) {
    return (
      <div className="flex justify-center text-center">
        <p className="mt-16">
          나의 여행 일정 목록을 가져오는 중에 에러가 발생했어요.
          <br /> 잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">나의 여행 일정</h2>
      </div>

      {!isError && (
        <div>
          <ul>
            {isLoading &&
              new Array(6).fill(null).map((_, idx) => (
                <div key={idx} className="relative my-4">
                  <Skeleton className="absolute top-[50%] h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-slate-100 md:h-[96px] md:w-[96px]"></Skeleton>
                  <Skeleton className="ml-[70px] h-[170px] border-x-[6px] border-y-[22px] border-white py-6  md:ml-[132px] md:items-center md:px-3" />
                </div>
              ))}
            {!isLoading &&
              data &&
              data.pages.map(
                (page) =>
                  'data' in page &&
                  page.data.map((plan: MyPlanT) => (
                    <MyPlan key={plan.plan_id} plan={plan} />
                  ))
              )}
          </ul>
          {isFetching && (
            <div className="flex animate-spin justify-center	">
              <PiSpinnerGapLight className="h-[32px] w-[32px]" />
            </div>
          )}
          {!isFetching && <div ref={observerRef} />}
        </div>
      )}
    </div>
  );
}
