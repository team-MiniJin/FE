import { Button } from '@/components/ui/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { UseFieldArrayAppend, UseFormReturn } from 'react-hook-form';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function AddPlaceButton({
  form,
  appendSchedule,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  appendSchedule: UseFieldArrayAppend<EditorPlanT, 'schedules'>;
}) {
  const { activatedDateCardIndex, setIsRegistration } = useCreatePlanStore();
  const handleAddPlace = () => {
    setIsRegistration(true);
    appendSchedule({
      idx: form.getValues().schedules.length,
      schedule_day: activatedDateCardIndex + 1,
      place_category: '',
      place_name: '',
      place_addr: '',
      region: '',
      arrival_time: '',
      budgets: [],
      x: 0,
      y: 0,
      place_memo: '',
    });
  };
  return (
    <Button
      type="button"
      variant="outline"
      className="h-[54px] w-full space-x-4"
      onClick={handleAddPlace}
    >
      <span>
        <AiOutlinePlus />
      </span>
      <span>장소 추가</span>
    </Button>
  );
}
