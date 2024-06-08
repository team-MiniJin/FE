import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';

export default function PlaceArrivalTimeInput({
  form,
  lastIndex,
}: {
  form: UseFormReturn<PlanT>;
  lastIndex: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`schedule.${lastIndex}.arrival_time`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>도착 시간</FormLabel>
          <FormControl>
            <Input {...field} type="text" placeholder="HH:mm (예: 07:10)" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
