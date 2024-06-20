import { AiOutlinePlus } from 'react-icons/ai';
import { addDays } from '@/widgets/plan-editor/utils/addDays';
import { UseFormReturn } from 'react-hook-form';
import { differenceInDays } from 'date-fns';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function AddPlanDateButton({
  form,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
}) {
  const { isEditing, isRegistration, setDateOfDays } = useCreatePlanStore();
  return (
    <button
      onClick={() => addDays(form, setDateOfDays)}
      type="button"
      className="flex h-[100px] w-[110px] shrink-0 flex-col items-center justify-center space-y-2 rounded-md border p-4 text-sm hover:bg-slate-100 disabled:bg-gray-100 disabled:text-[--deactivated-text-color]"
      aria-label="date card"
      disabled={
        isEditing ||
        isRegistration ||
        differenceInDays(
          new Date(form.getValues().end_date).setHours(0, 0, 0, 0),
          new Date(form.getValues().start_date).setHours(0, 0, 0, 0)
        ) > 58
      }
    >
      <span className="text-lg">
        <AiOutlinePlus />
      </span>
      <span>날짜 추가</span>
    </button>
  );
}
