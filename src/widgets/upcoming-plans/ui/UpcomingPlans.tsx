'use client';

import { useCarousel } from '@/shared';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import useUpcomingPlans from '@/widgets/upcoming-plans/model/useUpcomingPlans';
import calculateDday from '@/shared/utils/calculateDday';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UpcomingPlan from './UpcomingPlan';

const BREAK_POINTS: { [key: number]: number } = {
  320: 1,
  768: 2,
  1024: 3,
};

export default function UpcomingPlans() {
  const { data, isLoading } = useUpcomingPlans();
  const { carouselStartIndex, visibleSlides, nextItem, prevItem } = useCarousel(
    BREAK_POINTS,
    data ? data.length : 0,
    false,
    0
  );
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">다가오는 여행 일정</h2>
      </div>
      <div className="relative flex w-full justify-center overflow-hidden px-8 py-4">
        <ul className="flex h-[200px] w-full justify-between overflow-hidden">
          {isLoading &&
            new Array(3)
              .fill(null)
              .map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-full w-full flex-shrink-0 border-x-[0.5rem] border-white md:w-1/2 lg:w-1/3"
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
              {data.map((plan) => {
                if (calculateDday(plan.start_date) >= 0)
                  return (
                    <UpcomingPlan
                      key={plan.plan_id}
                      plan={plan}
                      carouselStartIndex={carouselStartIndex}
                      visibleSlides={visibleSlides}
                    />
                  );
                return null;
              })}

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
          {!isLoading && !data && (
            <Button variant="outline" asChild>
              <Link href="/create-plan">일정 만들러 가기</Link>
            </Button>
          )}
          {isLoading && (
            <Skeleton className="absolute right-0 top-1/2 h-[36px] w-[36px] -translate-y-1/2" />
          )}
        </ul>
      </div>
    </div>
  );
}
