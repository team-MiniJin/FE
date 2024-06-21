import { calculateStayDuration, ScheduleT, WayPoints } from '@/shared';
import { IoBookmarkOutline } from 'react-icons/io5';
import PlanSimpleView from '@/widgets/plan-simple-view/ui/PlanSimpleView';
import { useState } from 'react';
import Image from 'next/image';
import { UserTravelPlanT } from '../../types/user-travel-type';

export default function UserTravel({ plan }: { plan: UserTravelPlanT }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleAccordion();
    }
  };

  if (!plan) {
    return null;
  }

  return (
    <>
      <li>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={toggleAccordion}
          className="relative flex cursor-pointer items-center py-6 md:h-auto md:items-center md:px-3"
        >
          <div className="absolute top-[50%] h-[80px] w-[80px] -translate-y-1/2 overflow-hidden rounded-full bg-slate-100 md:h-[96px] md:w-[96px]">
            <Image src={`/theme/${plan.theme}.webp`} fill alt={plan.theme} />
          </div>
          <div className="w-full pl-[110px] md:pl-[132px]">
            <div className="space-y-1">
              <p className="inline-block rounded bg-[--brand-main-color] px-2 py-1 text-xs font-bold text-white">
                {plan.theme}
              </p>
              <div className="flex w-full flex-col md:flex-row md:items-center md:space-x-2">
                <p className="inline-block">{plan.user_nickname} 님의 </p>
                <p className="inline-block truncate font-bold">
                  {plan.plan_name}
                </p>
              </div>
              <div className="flex items-center space-x-2 truncate text-sm">
                <p className="truncate text-sm">
                  {calculateStayDuration(plan.start_date, plan.end_date)}
                </p>
                <span>|</span>
                <p className="truncate">
                  {plan.plan_budget.toLocaleString()}원
                </p>
                <span>|</span>
                <p className="truncate">{plan.number_of_members}명</p>
              </div>
              <div className="flex flex-col space-y-1 md:flex-row md:justify-between">
                <WayPoints waypoints={plan.region_list} className="text-sm" />

                <div className="flex space-x-4">
                  <p className="inline-block shrink-0 text-sm">
                    {plan.scope ? '공개' : '비공개'}
                  </p>
                  <div
                    className="flex items-center space-x-1"
                    aria-label={`스크랩 ${plan.number_of_scraps}`}
                  >
                    <span>
                      <IoBookmarkOutline className="text-base" />
                    </span>
                    <span>{plan.number_of_scraps}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <div
        className={`relative overflow-hidden rounded-md transition-all duration-300 ${isOpen ? 'h-[294px] opacity-100' : 'h-0 opacity-0'}`}
      >
        <PlanSimpleView
          planId={plan.plan_id}
          schedules={plan.schedules as ScheduleT[]}
        />
      </div>
      <div className="my-4 h-[1px] w-full border-b" />
    </>
  );
}
