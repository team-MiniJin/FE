'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function DateCards({
  dates,
  activatedCardIndex,
  disabled,
  onClickHandler,
}: {
  dates: string[];
  activatedCardIndex: number;
  disabled: boolean;
  onClickHandler?: (index: number) => void;
}) {
  const pathname = usePathname();

  return (
    <ul className="flex space-x-2 overflow-y-auto">
      {dates.map((date, index) => (
        <li key={date}>
          <button
            onClick={onClickHandler ? () => onClickHandler(index) : undefined}
            type="button"
            className={clsx(
              'flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm hover:bg-[--brand-sub-color] hover:text-white disabled:bg-gray-100 disabled:text-[--deactivated-text-color]',
              {
                'hover:tr bg-[--brand-main-color] !text-white disabled:!bg-[--brand-sub-color]':
                  activatedCardIndex === index,
                'space-y-0': pathname.split('/')[1] === 'plan',
              }
            )}
            aria-label={`${date} ${index}일차 날짜 카드 `}
            disabled={disabled}
          >
            <div className="flex items-center font-bold">{index + 1}일차</div>
            {pathname.split('/')[1] !== 'plan' && <div>{date}</div>}
          </button>
        </li>
      ))}
    </ul>
  );
}
