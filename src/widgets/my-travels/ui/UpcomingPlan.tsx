import calculateDday from '@/shared/utils/calculateDday';
import { UpcomingPlanT } from '@/widgets/my-travels/types/plan';
import Link from 'next/link';

export default function UpcomingPlan({
  plan,
  carouselStartIndex,
  visibleSlides,
}: {
  plan: UpcomingPlanT;
  carouselStartIndex: number;
  visibleSlides: number;
}) {
  const width: { [key: number]: string } = {
    1: 'w-full',
    2: 'w-1/2',
    3: 'w-1/3',
  };
  return (
    <li
      className={` ${width[visibleSlides]} h-[200px] flex-shrink-0 text-white transition-transform`}
      style={{
        transform: `translateX(-${carouselStartIndex * 100}%)`,
      }}
    >
      <Link
        href="/"
        className="relative mx-2 block h-full space-y-2 rounded-md bg-[--brand-color] p-4"
      >
        <div>
          <p className="font-bold">{plan.plan_name}</p>
          <p className="font-bold">D-{calculateDday(plan.start_date)}</p>
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
          className="absolute bottom-6 left-4 inline-block rounded bg-white p-2 text-xs font-bold text-[--brand-color]"
          aria-label={plan.theme}
        >
          <p>{plan.theme}</p>
        </div>
      </Link>
    </li>
  );
}
