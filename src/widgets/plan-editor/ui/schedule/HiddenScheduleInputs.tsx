import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function HiddenScheduleInputs({
  form,
  lastIndex,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  lastIndex: number;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();
  console.log(isEditing, editingScheduleIndex, lastIndex);
  return (
    <div>
      <FormField
        control={form.control}
        name={`schedules.${isEditing ? (editingScheduleIndex as number) : lastIndex}.schedule_day`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="number" {...field} className="hidden" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
