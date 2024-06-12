import clsx from 'clsx';

export default function DateCards({
  dates,
  activedCardIndex,
  disabled,
  onClickHandler,
}: {
  dates: string[];
  activedCardIndex: number;
  disabled: boolean;
  onClickHandler?: (index: number) => void;
}) {
  return (
    <ul className="flex space-x-2 overflow-y-auto">
      {dates.map((date, index) => (
        <li key={date}>
          <button
            onClick={onClickHandler ? () => onClickHandler(index) : undefined}
            type="button"
            className={clsx(
              'flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm text-[--brand-main-color] hover:bg-[--brand-sub-color] hover:text-white disabled:bg-gray-100 disabled:text-[--deactived-text-color]',
              {
                'bg-[--brand-main-color] !text-white hover:bg-[--brand-sub-color] disabled:!bg-[--brand-sub-color]':
                  activedCardIndex === index,
              }
            )}
            aria-label={`${date} ${index}일차 날짜 카드 `}
            disabled={disabled}
          >
            <div>{date}</div>
            <div>{index + 1}일차</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
