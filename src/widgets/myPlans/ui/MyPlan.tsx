/* eslint-disable react/no-array-index-key */
import { calculateStayDuration } from '@/shared';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoBookmarkOutline } from 'react-icons/io5';

import { MyPlanT } from '@/widgets/myPlans/types/myPlans';
import { GoHeart } from 'react-icons/go';

export default function MyPlan({ plan }: { plan: MyPlanT }) {
  return (
    <li className="relative flex h-[220px] cursor-pointer border-b py-8 md:h-auto md:items-center md:px-3">
      <div className="absolute top-[50%] h-[50px] w-[50px] -translate-y-1/2 rounded-full bg-gray-100 md:h-[96px] md:w-[96px]" />
      <div className="w-full pl-[70px] md:pl-[132px]">
        <div className="space-y-1">
          <p className="inline-block rounded bg-[--brand-color] px-2 py-1 text-xs font-bold text-white">
            {plan?.theme}
          </p>
          <div className="flex w-full flex-col space-y-1 md:flex-row md:items-center md:space-x-4">
            <p className="inline-block truncate font-bold">{plan?.plan_name}</p>
            <p className="truncate text-sm ">
              {plan?.start_date} ~ {plan?.end_date} (
              {calculateStayDuration(plan?.start_date, plan?.end_date)})
            </p>
          </div>
          <div className=" flex items-center space-x-2 truncate text-sm">
            <p className="truncate">
              예산 {plan?.plan_budget.toLocaleString()}원
            </p>
            <span>|</span>
            <p className="truncate">{plan?.number_of_members}명</p>
          </div>
          <div className="flex space-x-2">
            {plan?.regions?.map((region, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <p className="inline-block truncate">{region}</p>
                {idx !== plan.regions.length - 1 && (
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
          aria-label={`좋아요 ${plan.number_of_likes}`}
        >
          <span>
            <GoHeart className="text-base" />
          </span>
          <span>{plan.number_of_likes}</span>
        </div>
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
    </li>
  );
}
