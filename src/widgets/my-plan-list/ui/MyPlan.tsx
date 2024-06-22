import { calculateStayDuration, PlanTheme, WayPoints } from '@/shared';
import { CiBookmark } from 'react-icons/ci';
import PlanSimpleView from '@/widgets/plan-simple-view/ui/PlanSimpleView';
import { useState } from 'react';
import Image from 'next/image';
import { MyPlanT } from '../types/my-plan-type';

export default function MyPlan({ plan }: { plan: MyPlanT }) {
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
          className="relative flex h-auto cursor-pointer py-6 md:items-center md:px-3"
        >
          <div className="absolute top-[50%] h-[80px] w-[80px] -translate-y-1/2 overflow-hidden rounded-full bg-slate-100 md:h-[96px] md:w-[96px]">
            <Image src={`/theme/${plan.theme}.webp`} fill alt={plan.theme} />
          </div>
          <div className="w-full pl-[110px] md:pl-[132px]">
            <div className="space-y-1">
              <PlanTheme theme={plan.theme} />
              <div className="flex w-full flex-col space-y-1 md:flex-row md:items-center md:space-x-4">
                <p className="inline-block truncate text-lg font-bold">
                  {plan?.plan_name}
                </p>
                <p className="truncate text-sm ">
                  {plan?.start_date} ~ {plan?.end_date} (
                  {calculateStayDuration(plan?.start_date, plan?.end_date)})
                </p>
              </div>
              <div className=" flex items-center space-x-2 truncate text-sm">
                <p className="truncate">
                  {plan?.plan_budget.toLocaleString()}원
                </p>
                <span>|</span>
                <p className="truncate">{plan?.number_of_members}명</p>
              </div>
              <div className="flex flex-col justify-between space-y-1 md:flex-row">
                <div className="flex space-x-2">
                  <WayPoints waypoints={plan.region_list} className="text-sm" />
                </div>
                <div className="m-0 flex  items-center space-x-4 text-sm">
                  <p className="inline-block shrink-0	">
                    {plan.scope ? '공개' : '비공개'}
                  </p>

                  <div
                    className="flex items-center space-x-1"
                    aria-label={`스크랩 ${plan.number_of_scraps}`}
                  >
                    <span>
                      <CiBookmark className="pt-0.5 text-lg" />
                    </span>
                    <span className="flex items-center">
                      {plan.number_of_scraps}
                    </span>
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
        <PlanSimpleView planId={plan.plan_id} schedules={plan.schedules} />
      </div>
      <div className="my-4 h-[1px] w-full border-b" />
    </>
  );
}
