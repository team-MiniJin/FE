import clsx from 'clsx';
import useCreatePlanStore from '../../store/createPlanStore';

export default function DateCard({
  idx,
  date,
  isActived,
}: {
  idx: number;
  date: Date;
  isActived: boolean;
}) {
  const { setActivedDateCardIndex, isEditing, isRegistration } =
    useCreatePlanStore();
  return (
    <button
      onClick={() => setActivedDateCardIndex(idx)}
      type="button"
      className={clsx(
        'flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm text-[--brand-main-color] hover:bg-[--brand-sub-color] hover:text-white disabled:bg-gray-100 disabled:text-[--deactived-text-color]',
        {
          'bg-[--brand-main-color] !text-white hover:bg-[--brand-sub-color] disabled:!bg-[--brand-sub-color]':
            isActived,
        }
      )}
      aria-label="date card"
      disabled={isEditing || isRegistration}
    >
      <span className="font-bold">{idx + 1}일차</span>
      <span>{date.toLocaleDateString().slice(0, -1)}</span>
    </button>
  );
}
