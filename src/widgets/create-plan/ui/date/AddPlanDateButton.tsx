import { AiOutlinePlus } from 'react-icons/ai';
import { addDays } from '@/widgets/create-plan/util/addDays';
import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import useCreatePlanStore from '../../store/createPlanStore';

export default function AddPlanDateButton({
  form,
  setDateOfDays,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  setDateOfDays: React.Dispatch<React.SetStateAction<Date[]>>;
}) {
  const { isEditing, isRegistration } = useCreatePlanStore();
  return (
    <button
      onClick={() => addDays(form, setDateOfDays)}
      type="button"
      className="flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm hover:bg-slate-100 disabled:bg-gray-100 disabled:text-[--deactived-text-color]"
      aria-label="date card"
      disabled={isEditing || isRegistration}
    >
      <span className="text-lg">
        <AiOutlinePlus />
      </span>
      <span>날짜 추가</span>
    </button>
  );
}
