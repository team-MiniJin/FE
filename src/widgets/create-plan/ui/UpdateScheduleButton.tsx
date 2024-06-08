import { Button } from '@/components/ui/button';
import { UseFieldArrayUpdate, UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import useCreatePlanStore from '../store/createPlanStore';

export default function UpdateScheduleButton({
  form,
  lastIndex,
  updateSchedule,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  lastIndex: number;
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
}) {
  const { setIsRegistration, isEditing, setIsEditing } = useCreatePlanStore();
  const handleUpdateSchedule = async () => {
    const { trigger, setValue, getValues } = form;
    const isValid = await trigger(`schedule.${lastIndex}`);
    if (!isValid) {
      // console.error('Form validation failed');
      return;
    }
    const values = getValues();
    const scheduleItem = values.schedule[lastIndex];
    updateSchedule(lastIndex, scheduleItem);

    setIsRegistration(false);
    setIsEditing(false);
    const updatedSchedules = getValues().schedule.slice();
    updatedSchedules.sort((a, b) => {
      const timeA = a.arrival_time.split(':').map(Number);
      const timeB = b.arrival_time.split(':').map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

    setValue('schedule', updatedSchedules);
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
