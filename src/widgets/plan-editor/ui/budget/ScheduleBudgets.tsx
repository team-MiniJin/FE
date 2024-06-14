import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { GoPlus } from 'react-icons/go';
import { EditorPlanT } from '../../types/plan-editor-type';
import ScheduleBudget from './ScheduleBudget';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceBudgets({
  form,
  curIndex,
}: {
  form: UseFormReturn<EditorPlanT>;
  curIndex: number;
}) {
  const { editingScheduleIndex } = usePlanEditorStore();
  const { control } = form;
  const {
    fields: budgetFields,
    append: appendBudget,
    remove: removeBudget,
    update: updateBudget,
  } = useFieldArray({
    control,
    name: `schedules.${editingScheduleIndex !== null ? editingScheduleIndex : curIndex}.budgets`,
  });

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">예산 (선택)</h4>
      {budgetFields.map((budgetField, budgetIndex) => (
        <div key={budgetField.id} className="flex space-x-2">
          <ScheduleBudget
            form={form}
            curIndex={curIndex}
            budgetIndex={budgetIndex}
            removeBudget={removeBudget}
          />
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
