import { Button } from '@/components/ui/button';
import { UseFieldArrayUpdate, UseFormReturn } from 'react-hook-form';
import { add } from 'date-fns';
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

    const sortedSchedules = getValues().schedules.sort(
      (scheduleA: any, scheduleB: any) => {
        const dateTimeA = add(new Date(values.start_date), {
          days: scheduleA.schedule_day - 1,
        });
        const [hoursA, minutesA] = scheduleA.arrival_time
          .split(':')
          .map(Number);
        dateTimeA.setHours(hoursA, minutesA);

        const dateTimeB = add(new Date(values.start_date), {
          days: scheduleB.schedule_day - 1,
        });
        const [hoursB, minutesB] = scheduleB.arrival_time
          .split(':')
          .map(Number);
        dateTimeB.setHours(hoursB, minutesB);

        if (dateTimeA < dateTimeB) return -1;
        if (dateTimeA > dateTimeB) return 1;
        return 0;
      }
    );
    setValue('schedules', sortedSchedules);
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
