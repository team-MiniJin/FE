'use client';

import calculateDday from '@/shared/utils/calculateDday';
import Link from 'next/link';
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
      className={`${widthClass} h-[200px] flex-shrink-0 text-white transition-transform`}
      style={{
        transform: `translateX(-${carouselStartIndex * 100}%)`,
      }}
    >
      <Link
        href="/"
        className="relative mx-2 block h-full space-y-2 rounded-md bg-[--brand-main-color] p-4"
      >
        <div>
          <p className="font-bold">{plan.plan_name}</p>
          <p className="font-bold">D-{calculateDday(plan.start_date)}</p>
        </div>
        <p className="inline-block border-b text-sm">
          {plan.start_date} ~ {plan.end_date}
        </p>
        <div className="flex items-center space-x-2 text-sm font-bold">
          <p className="flex">{plan.plan_budget.toLocaleString()}원</p>
          <span>|</span>
          <p className="flex">{plan.number_of_members}명</p>
        </div>
        <div
          className="absolute bottom-6 left-4 inline-block rounded bg-white p-2 text-xs font-bold text-[--brand-main-color]"
          aria-label={plan.theme}
        >
          <p>{plan.theme}</p>
        </div>
        <div className="absolute right-4 top-4 flex space-x-2">
          <div className="flex items-center space-x-1">
            <span className="text-lg">❤️</span>
            <p>{plan.number_of_likes}</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-lg">🔖</span>
            <p>{plan.number_of_scraps}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
