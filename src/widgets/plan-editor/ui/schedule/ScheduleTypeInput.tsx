import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceTypeInput({
  form,
  curIndex,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  curIndex: number;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();
  const [charCount, setCharCount] = useState<number>(0);
  useEffect(() => {
    setCharCount(form.getValues('plan_name').length);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 30) {
      form.setValue(
        `schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.place_category`,
        value
      );
      setCharCount(value.length);
    }
  };
  return (
    <FormField
      control={form.control}
      name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.place_category`}
      render={({ field }) => (
        <FormItem className="max-w-[480px]">
          <FormLabel>어떤 장소인가요?</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder="예) 집, 음식점 등"
                value={field.value}
                onChange={handleChange}
              />
              <div className="absolute right-1 top-0 mr-2 mt-2 text-sm text-gray-500">
                {charCount}/30
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
