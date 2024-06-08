import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function PlaceTypeInput({
  form,
  lastIndex,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  lastIndex: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`schedule.${lastIndex}.place_category`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>장소 유형</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="text"
              placeholder="어떤 장소인가요? (예: 집, 음식점)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
