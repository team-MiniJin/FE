import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { IoMdRemove } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function PlaceBudgetList({
  form,
  lastIndex,
}: {
  form: UseFormReturn<EditorPlanT>;
  lastIndex: number;
}) {
  const { control } = form;
  const {
    fields: budgetFields,
    append: appendBudget,
    remove: removeBudget,
    update: updateBudget,
  } = useFieldArray({
    control,
    name: `schedules.${lastIndex}.budgets`,
  });
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">예산 (선택)</h4>
      {budgetFields.map((budgetField, budgetIndex) => (
        <div key={budgetField.id} className="flex space-x-2">
          <FormField
            control={form.control}
            name={`schedules.${lastIndex}.budgets.${budgetIndex}.budget_category`}
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
            name={`schedules.${lastIndex}.budgets.${budgetIndex}.cost`}
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
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => appendBudget({ budget_category: '', cost: 0 })}
      >
        <GoPlus className="text-lg" />
      </Button>
    </div>
  );
}
