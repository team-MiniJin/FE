'use client';

import { useInfiniteScroll } from '@/shared';
import { Skeleton } from '@/components/ui/skeleton';
import useMyScraps from '../api/useMyScraps';
import { ScrapT } from '../types/type';
import ScrapItem from './ScrapItem';

export default function ScrapList() {
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    fetchNextPage,
    isLoading,
  } = useMyScraps();
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage && !isFetching) fetchNextPage();
  }, hasNextPage);
  if (isError) {
    return (
      <div className="flex justify-center text-center">
        <p className="mt-16">
          스크랩 목록을 가져오는 중에 에러가 발생했어요.
          <br /> 잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-[16px]">
      {isLoading &&
        new Array(8).fill(null).map((_, idx) => (
          <div key={idx} className="relative my-4">
            <Skeleton className="absolute top-[50%] h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-slate-100 md:h-[96px] md:w-[96px]"></Skeleton>
            <Skeleton className="ml-[70px] h-[170px] border-x-[6px] border-y-[22px] border-white py-6  md:ml-[132px] md:items-center md:px-3" />
          </div>
        ))}
      <ul>
        {!isLoading &&
          data?.pages.map(
            (page) =>
              'data' in page &&
              page.data.map((plan: ScrapT) => (
                <ScrapItem key={plan.plan_id} plan={plan} />
              ))
          )}
      </ul>
      <div ref={observerRef} />
    </div>
  );
}
