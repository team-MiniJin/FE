'use client';

import Link from 'next/link';
import { calculateStayDuration } from '@/shared';
import { IoBookmarkOutline } from 'react-icons/io5';
import { PopularPlanT } from '../types/popular-plan-type';

interface PopularPlanProps {
  plan: PopularPlanT;
  carouselStartIndex: number;
  visibleSlides: number;
}

export default function PopularPlan({
  plan,
  carouselStartIndex,
  visibleSlides,
}: PopularPlanProps) {
  const width: { [key: number]: string } = {
    1: 'w-full',
    2: 'w-1/2',
    4: 'w-1/4',
  };

  const widthClass = width[visibleSlides] || 'w-full';

  return (
    <li
      className={`${widthClass} h-[180px] flex-shrink-0 text-white transition-transform`}
      style={{
        transform: `translateX(-${carouselStartIndex * 100}%)`,
      }}
    >
      <div className="relative mx-2 block h-full space-y-2 rounded-md bg-[--brand-main-color] p-4 text-sm">
        <div>
          <p className="">{plan.user_nickname} 님의</p>
          <Link href={`/exploring/plan/${plan.plan_id}`}>
            <p className="text-base font-bold">{plan.plan_name}</p>
          </Link>
        </div>
        <div>
          <div>
            <p>{calculateStayDuration(plan?.start_date, plan?.end_date)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="flex">{plan.plan_budget.toLocaleString()}원</p>
            <span>|</span>
            <p className="flex">{plan.number_of_members}명</p>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-4 inline-block rounded bg-white p-2 text-xs font-bold text-[--brand-main-color]"
          aria-label={plan.theme}
        >
          <p>{plan.theme}</p>
        </div>

        <div className="absolute bottom-6 right-4 flex items-center space-x-1">
          <span className="rounded-full bg-white p-1 text-black shadow-md">
            <IoBookmarkOutline />
          </span>
          <p>{plan.number_of_scraps}</p>
        </div>
      </div>
    </li>
  );
}
