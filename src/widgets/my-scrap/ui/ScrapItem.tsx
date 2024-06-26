import { calculateStayDuration, THEMES } from '@/shared';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ScrapT } from '../types/type';

export default function ScrapItem({ plan }: { plan: ScrapT }) {
  const router = useRouter();
  if (!plan) {
    return null;
  }
  const handleClick = () => {
    router.push(`/plan/${plan.plan_id}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <>
      <li>
        <div
          role="button"
          tabIndex={0}
          className="relative flex cursor-pointer items-center py-6 md:h-auto md:items-center md:px-3"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <div className="absolute top-[50%] h-[80px] w-[80px] -translate-y-1/2 overflow-hidden rounded-full bg-slate-100 md:h-[96px] md:w-[96px]">
            <Image
              src={`/theme/${plan.theme}.webp`}
              fill
              alt={THEMES[plan.theme]}
            />
          </div>
          <div className="w-full pl-[110px] md:pl-[132px]">
            <div className="space-y-1">
              <p className="inline-block rounded bg-[--brand-main-color] px-2 py-1 text-xs font-bold text-white">
                {THEMES[plan.theme]}
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
            </div>
          </div>
        </div>
      </li>
      <div className="my-4 h-[1px] w-full border-b" />
    </>
  );
}
