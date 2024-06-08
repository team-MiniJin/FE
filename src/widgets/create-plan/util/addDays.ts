import { eachDayOfInterval } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';

export const addDays = (
  form: UseFormReturn<PlanT, any, undefined>,
  setDateOfDays: React.Dispatch<React.SetStateAction<Date[]>>
) => {
  const endDate = new Date(form.getValues().end_date);
  const startDate = new Date(form.getValues().start_date);
  if (!startDate || !endDate) return;

  // 새로운 Date 객체를 사용하여 nextEndDate를 만듭니다.
  const nextEndDate = new Date(endDate);
  nextEndDate.setDate(nextEndDate.getDate() + 1);
  form.setValue('end_date', nextEndDate);

  const days = eachDayOfInterval({
    start: startDate,
    end: nextEndDate,
  });
  setDateOfDays(days);
};
