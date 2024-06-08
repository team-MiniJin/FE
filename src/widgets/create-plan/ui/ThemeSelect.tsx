import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { THEMES } from '@/widgets/create-plan/constants/create-plan';
import { PlanT } from '@/widgets/create-plan/types/create-plan';

export default function ThemeSelect({
  form,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <FormItem>
          <FormLabel>여행 테마</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="여행 테마를 선택해 주세요." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(THEMES).map((key) => (
                <SelectItem key={key} value={key}>
                  {THEMES[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}