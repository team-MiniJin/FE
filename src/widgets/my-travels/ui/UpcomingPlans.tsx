/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import useCarousel from '@/shared/hooks/useCarousel';
import useUpcomingPlans from '@/widgets/my-travels/model/useUpcomingPlans';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import UpcomingPlan from './UpcomingPlan';

const BREAK_POINTS: { [key: number]: number } = {
  320: 1,
  768: 2,
  1024: 3,
};

export default function UpcomingPlans() {
  const { data } = useUpcomingPlans();
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
        {data ? (
          <ul className=" flex w-full justify-between overflow-hidden">
            <button
              type="button"
              className="absolute left-0 top-2/4 z-10 -translate-y-2/4  text-4xl disabled:hidden"
              aria-label="이전 슬라이드"
              onClick={prevItem}
              disabled={carouselStartIndex === 0}
            >
              <MdOutlineKeyboardArrowLeft />
            </button>

            {data?.map((plan) => (
              <UpcomingPlan
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
          </ul>
        ) : (
          <div>아직 일정을 만들지 않으셨네요!</div>
        )}
      </div>
    </div>
  );
}
