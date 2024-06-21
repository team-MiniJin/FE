'use client';

import { useCarousel } from '@/shared';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { Skeleton } from '@/components/ui/skeleton';
import usePopularPlan from '../model/usePopularPlans';
import PopularPlan from './PopularPlan';

const BREAK_POINTS: { [key: number]: number } = {
  574: 2,
  1024: 4,
};

export default function PopularPlans() {
  const { data, isLoading, isError } = usePopularPlan();
  const { carouselStartIndex, visibleSlides, nextItem, prevItem } = useCarousel(
    BREAK_POINTS,
    data ? data.length : 0,
    false,
    0
  );

  if (isError || (!isLoading && !data)) {
    return (
      <div className="flex justify-center text-center">
        <p className="mt-16">
          금주 인기 여행 일정을 가져오는 중에 에러가 발생했어요.
          <br /> 잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">금주 인기 여행 일정</h2>
      </div>
      <div className="relative flex w-full justify-center overflow-hidden px-8 py-4">
        <ul className="flex h-[200px] w-full justify-start overflow-hidden">
          {isLoading &&
            new Array(4)
              .fill(null)
              .map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-full w-full flex-shrink-0 border-x-[0.5rem] border-white min-[574px]:w-1/2 lg:w-1/4"
                />
              ))}
          {!isLoading && data && (
            <>
              <button
                type="button"
                className="absolute left-0 top-2/4 z-10 -translate-y-2/4  text-4xl disabled:hidden"
                aria-label="이전 슬라이드"
                onClick={prevItem}
                disabled={carouselStartIndex === 0}
              >
                <MdOutlineKeyboardArrowLeft />
              </button>
              {data.map((plan) => (
                <PopularPlan
                  key={plan.plan_id}
                  plan={plan}
                  carouselStartIndex={carouselStartIndex}
                  visibleSlides={visibleSlides}
                />
              ))}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl disabled:hidden"
                type="button"
                aria-label="다음 슬라이드"
                onClick={nextItem}
                disabled={
                  carouselStartIndex >= (data?.length ?? 0) - visibleSlides
                }
              >
                <MdOutlineKeyboardArrowRight />
              </button>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
