import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { IoMdRemove } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function ScheduleBudget({
  form,
  curIndex,
  budgetIndex,
  removeBudget,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  curIndex: number;
  budgetIndex: number;
  removeBudget: UseFieldArrayRemove;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();

  return (
    <>
      <FormField
        control={form.control}
        name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.budgets.${budgetIndex}.budget_category`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" {...field} placeholder="지출 내용" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.budgets.${budgetIndex}.cost`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="number"
                {...field}
                placeholder="지출 비용"
                min={0}
                max={100000000}
                onChange={(e) => {
                  const { value } = e.target;
                  field.onChange(value === '' ? '' : parseInt(value, 10));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={() => removeBudget(budgetIndex)}
        variant="ghost"
      >
        <IoMdRemove />
      </Button>
    </>
  );
}
