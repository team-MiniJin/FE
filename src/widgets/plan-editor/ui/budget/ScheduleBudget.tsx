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
import { useEffect, useState } from 'react';
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
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(form.getValues('plan_name').length);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 20) {
      form.setValue(
        `schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.budgets.${budgetIndex}.budget_category`,
        value
      );
      setCharCount(value.length);
    }
  };
  return (
    <>
      <FormField
        control={form.control}
        name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.budgets.${budgetIndex}.budget_category`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Input
                  className="max-w-[350px] pr-[60px]"
                  {...field}
                  placeholder="예) 간식비"
                  value={field.value}
                  onChange={handleChange}
                />
                <div className="absolute right-1 top-0 mr-2 mt-2 text-sm text-gray-500">
                  {charCount}/20
                </div>
              </div>
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
                {...field}
                placeholder="예) 10,000"
                value={field.value}
                onChange={(e) => {
                  let value = parseInt(e.target.value.replace(/,/g, ''), 10);

                  if (value > 99999999) {
                    value = 99999999;
                  } else if (value < 1 || !value) {
                    value = 1;
                  }
                  field.onChange(value.toLocaleString());
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
