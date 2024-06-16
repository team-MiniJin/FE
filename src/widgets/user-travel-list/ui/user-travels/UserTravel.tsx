import { calculateStayDuration, ScheduleT } from '@/shared';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoBookmarkOutline } from 'react-icons/io5';
import PlanSimpleView from '@/widgets/plan-simple-view/ui/PlanSimpleView';
import { useState } from 'react';
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

  return (
    <>
      <li>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={toggleAccordion}
          className="relative flex h-[200px] cursor-pointer py-6 md:h-auto md:items-center md:px-3"
        >
          <div className="absolute top-[50%] h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-slate-100 md:h-[96px] md:w-[96px]" />
          <div className="w-full pl-[70px] md:pl-[132px]">
            <div className="space-y-1">
              <p className="inline-block rounded bg-[--brand-main-color] px-2 py-1 text-xs font-bold text-white">
                {plan?.theme}
              </p>
              <div className="flex w-full flex-col items-center space-x-2 md:flex-row md:items-center">
                <p className="inline-block">{plan.user_nickname} 님의 </p>
                <p className="inline-block truncate font-bold">
                  {plan?.plan_name}
                </p>
              </div>
              <div className=" flex items-center space-x-2 truncate text-sm">
                <p className="truncate text-sm ">
                  {calculateStayDuration(plan?.start_date, plan?.end_date)}
                </p>
                <span>|</span>
                <p className="truncate">
                  예산 {plan?.plan_budget.toLocaleString()}원
                </p>
                <span>|</span>
                <p className="truncate">{plan?.number_of_members}명</p>
              </div>
              <div className="flex space-x-2">
                {plan?.waypoints?.map((region, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <p className="inline-block truncate">{region}</p>
                    {idx !== plan.waypoints.length - 1 && (
                      <span>
                        <IoIosArrowRoundForward />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-[32px] left-[70px] m-0 flex  space-x-4 text-xs md:bottom-8 md:left-auto md:right-0 ">
            <p className="inline-block shrink-0	">
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
      </li>
      <div
        className={`relative mt-2 overflow-hidden rounded-md transition-all duration-300 ${isOpen ? 'h-[294px]' : 'h-0'}`}
      >
        <PlanSimpleView
          planId={plan.plan_id}
          schedules={plan.schedules as unknown as ScheduleT[]}
        />
      </div>
      <div className="my-4 h-[1px] w-full border-b" />
    </>
  );
}