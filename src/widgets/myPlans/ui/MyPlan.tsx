/* eslint-disable react/no-array-index-key */
import { calculateStayDuration } from '@/shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoIosArrowRoundForward } from 'react-icons/io';
import { MyPlanT } from '@/widgets/myPlans/types/myPlans';

export default function MyPlan({ plan }: { plan: MyPlanT }) {
  return (
    <li className="flex	cursor-pointer  items-center space-x-10 border-b px-3 py-8">
      <div className="h-[96px] w-[96px] rounded-full bg-gray-100" />
      <div className="space-y-2">
        <p className="inline-block rounded bg-[--brand-color] px-2 py-1 text-xs font-bold text-white">
          {plan.theme}
        </p>
        <div className="flex items-center space-x-4">
          <p className="inline-block font-bold">{plan.plan_name}</p>
          <p className="text-sm">
            {plan.start_date} ~ {plan.end_date} (
            {calculateStayDuration(plan.start_date, plan.end_date)})
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <p>예산 {plan.plan_budget.toLocaleString()}원</p>
          <span>|</span>
          <p>{plan.number_of_members}명</p>
        </div>
        <div className="flex space-x-2">
          {plan?.regions?.map((region, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} className="flex items-center space-x-2 text-sm">
              <p className="inline-block ">{region}</p>
              {idx !== plan.regions.length - 1 && (
                <span>
                  <IoIosArrowRoundForward />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}
