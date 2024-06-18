import { useState, useEffect } from 'react';
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

export default function TitleInput({
  form,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
}) {
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(form.getValues('plan_name').length);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 60) {
      form.setValue('plan_name', value);
      setCharCount(value.length);

      if (value.length > 0) {
        form.clearErrors('plan_name');
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name="plan_name"
      render={({ field }) => (
        <FormItem className="max-w-[900px]">
          <FormLabel>여행 일정 이름</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder="여행 일정 이름을 입력해 주세요."
                value={field.value}
                onChange={handleChange}
              />
              <div className="absolute right-1 top-0 mr-2 mt-2 text-sm text-gray-500">
                {charCount}/60
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
