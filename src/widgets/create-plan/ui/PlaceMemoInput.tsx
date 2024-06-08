import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';

export default function PlaceMemoInput({
  form,
  lastIndex,
}: {
  form: UseFormReturn<PlanT>;
  lastIndex: number;
}) {
  return (
    <FormField
      control={form.control}
      name={`schedule.${lastIndex}.place_memo`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>메모 (선택)</FormLabel>
          <FormControl>
            <Input type="text" {...field} placeholder="메모를 입력하세요" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
