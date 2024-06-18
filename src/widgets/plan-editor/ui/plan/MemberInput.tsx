import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function MemberInput({
  form,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="number_of_members"
      render={({ field }) => (
        <FormItem>
          <FormLabel>여행 인원</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="w-[80px]"
              type="number"
              placeholder="예) 1"
              value={field.value}
              onChange={(e) => {
                let value = parseInt(e.target.value.replace(/,/g, ''), 10);
                if (value > 999) {
                  value = 999;
                } else if (value < 1 || !value) {
                  value = 1;
                }
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
