import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceMemoInput({
  form,
  curIndex,
}: {
  form: UseFormReturn<EditorPlanT>;
  curIndex: number;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(form.getValues('plan_name').length);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 60) {
      form.setValue(
        `schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.place_memo`,
        value
      );
      setCharCount(value.length);
    }
  };
  return (
    <FormField
      control={form.control}
      name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.place_memo`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>메모 (선택)</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder="메모할 내용이 있다면 입력해 주세요."
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
