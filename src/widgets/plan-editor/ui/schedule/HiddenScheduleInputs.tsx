import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function HiddenScheduleInputs({
  form,
  lastIndex,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  lastIndex: number;
}) {
  return (
    <div>
      <FormField
        control={form.control}
        name={`schedules.${lastIndex}.schedule_day`}
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
