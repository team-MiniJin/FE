import { eachDayOfInterval } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { EditorPlanT } from '../types/plan-editor-type';

export const addDays = (
  form: UseFormReturn<EditorPlanT, any, undefined>,
  setDateOfDays: (dateOfDays: Date[]) => void
) => {
  const endDate = new Date(form.getValues().end_date);
  const startDate = new Date(form.getValues().start_date);
  if (!startDate || !endDate) return;

  const nextEndDate = new Date(endDate);
  nextEndDate.setDate(nextEndDate.getDate() + 1);
  form.setValue('end_date', nextEndDate);

  const days = eachDayOfInterval({
    start: startDate,
    end: nextEndDate,
  });
  setDateOfDays(days);
};
