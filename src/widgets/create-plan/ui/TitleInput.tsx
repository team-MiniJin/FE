import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PlanT } from '../types/create-plan';

export default function TitleInput({
  form,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="plan_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>여행 일정 이름</FormLabel>
          <FormControl>
            <Input placeholder="여행 일정 이름을 입력해 주세요." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
