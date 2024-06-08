import { AiOutlinePlus } from 'react-icons/ai';
import { addDays } from '@/widgets/create-plan/util/addDays';
import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';

export default function AddPlanDateButton({
  form,
  setDateOfDays,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  setDateOfDays: React.Dispatch<React.SetStateAction<Date[]>>;
}) {
  return (
    <button
      onClick={() => addDays(form, setDateOfDays)}
      type="button"
      className="flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm hover:bg-slate-100"
      aria-label="date card"
    >
      <span className="text-lg">
        <AiOutlinePlus />
      </span>
      <span>날짜 추가</span>
    </button>
  );
}
