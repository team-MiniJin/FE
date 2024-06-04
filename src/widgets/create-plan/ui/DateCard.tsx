import clsx from 'clsx';

export default function DateCard({
  idx,
  date,
  isActived,
  setIndextOfActivedDateCard,
}: {
  idx: number;
  date: Date;
  isActived: boolean;
  setIndextOfActivedDateCard: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <button
      onClick={() => setIndextOfActivedDateCard(idx)}
      type="button"
      className={clsx(
        'flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm text-[--brand-main-color] hover:bg-[--brand-sub-color] hover:text-white',
        {
          'bg-[--brand-main-color] text-white hover:bg-[--brand-main-color]':
            isActived,
        }
      )}
      aria-label="date card"
    >
      <span className="font-bold">{idx + 1}일차</span>
      <span>{date.toLocaleDateString().slice(0, -1)}</span>
    </button>
  );
}
