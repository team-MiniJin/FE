import calculateDday from '@/shared/utils/calculateDday';
import Link from 'next/link';
import { THEMES, WIDTH } from '@/shared';
import { UpcomingPlanT } from '../types/upcoming-plan-type';

export default function UpcomingPlan({
  plan,
  carouselStartIndex,
  visibleSlides,
}: {
  plan: UpcomingPlanT;
  carouselStartIndex: number;
  visibleSlides: number;
}) {
  return (
    <li
      className="h-full w-full flex-shrink-0 text-white transition-transform md:w-1/2 lg:w-1/3"
      style={{
        transform: `translateX(-${carouselStartIndex * 100}%)`,
      }}
    >
      <div className="relative mx-2 block h-full space-y-2 rounded-md bg-[--brand-main-color] p-4">
        <div>
          <p className="font-bold">
            {calculateDday(plan.start_date) === 0
              ? '오늘 떠나는 여행'
              : `D - ${calculateDday(plan.start_date)}`}
          </p>
          <Link href={`/my-travels/plan/${plan.plan_id}`} className="">
            <p className="font-bold">{plan.plan_name}</p>
          </Link>
        </div>
        <p className="inline-block border-b text-sm">
          {plan.start_date} ~ {plan.end_date}
        </p>
        <div className="flex items-center space-x-2 text-sm font-bold">
          <p className="flex">{plan.plan_budget}원</p>
          <span>|</span>
          <p className="flex">{plan.number_of_members}명</p>
        </div>
        <div
          className="absolute bottom-6 left-4 inline-block rounded bg-white p-2 text-xs font-bold text-[--brand-main-color]"
          aria-label={plan.theme}
        >
          <p>{THEMES[plan.theme]}</p>
        </div>
      </div>
    </li>
  );
}
