import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function ScopeRadioGroup({
  form,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
}) {
  return (
    <FormField
      control={form.control}
      name="scope"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>공개 여부</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => field.onChange(value === 'true')}
              defaultValue={field.value ? 'true' : 'false'}
              className="flex  space-x-4"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="true" id="public" />
                </FormControl>
                <FormLabel htmlFor="public" className="font-normal">
                  공개
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="false" id="private" />
                </FormControl>
                <FormLabel htmlFor="private" className="font-normal">
                  비공개
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
