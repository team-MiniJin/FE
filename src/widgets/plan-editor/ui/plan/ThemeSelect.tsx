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
import { THEMES } from '../../../../shared/constants/themes';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function ThemeSelect({
  form,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="theme"
      render={({ field }) => (
        <FormItem className="w-[294px]">
          <FormLabel>여행 테마</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="여행 테마를 선택해 주세요." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(THEMES).map((key) =>
                key === 'all' ? null : (
                  <SelectItem key={key} value={key}>
                    {THEMES[key]}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
