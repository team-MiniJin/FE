import { Button } from '@/components/ui/button';
import { UseFieldArrayUpdate, UseFormReturn } from 'react-hook-form';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function UpdateScheduleButton({
  form,
  curIndex,
  updateSchedule,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  curIndex: number;
  updateSchedule: UseFieldArrayUpdate<EditorPlanT, 'schedules'>;
}) {
  const {
    setIsRegistration,
    isEditing,
    setIsEditing,
    editingScheduleIndex,
    setEditingScheduleIndex,
  } = useCreatePlanStore();
  const handleUpdateSchedule = async () => {
    const { trigger, setValue, getValues } = form;
    const isValid = await trigger(
      `schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}`
    );
    if (!isValid) {
      return;
    }
    const values = getValues();
    const scheduleItem =
      values.schedules[isEditing ? (editingScheduleIndex as number) : curIndex];
    updateSchedule(
      isEditing ? (editingScheduleIndex as number) : curIndex,
      scheduleItem
    );

    setIsRegistration(false);
    setIsEditing(false);
    setEditingScheduleIndex(null);
    const updatedSchedules = getValues().schedules.slice();
    updatedSchedules.sort((a, b) => {
      const timeA = a.arrival_time.split(':').map(Number);
      const timeB = b.arrival_time.split(':').map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

    setValue('schedules', updatedSchedules);
  };
  return (
    <Button
      type="button"
      onClick={handleUpdateSchedule}
      className="w-[120px] bg-[--brand-main-color] hover:bg-[--brand-sub-color]"
    >
      {isEditing ? '수정' : '추가'}
    </Button>
  );
}
