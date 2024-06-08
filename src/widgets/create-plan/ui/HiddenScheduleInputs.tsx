import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import { Input } from '@/components/ui/input';

export default function HiddenScheduleInputs({
  form,
  lastIndex,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  lastIndex: number;
}) {
  return (
    <div>
      <FormField
        control={form.control}
        name={`schedule.${lastIndex}.schedule_day`}
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
