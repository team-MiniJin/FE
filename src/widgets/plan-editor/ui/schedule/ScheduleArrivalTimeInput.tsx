import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceArrivalTimeInput({
  form,
  curIndex,
}: {
  form: UseFormReturn<EditorPlanT>;
  curIndex: number;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();

  return (
    <FormField
      control={form.control}
      name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.arrival_time`}
      render={({ field }) => (
        <FormItem className="w-[100px]">
          <FormLabel>도착 시간</FormLabel>
          <FormControl>
            <Input {...field} type="text" placeholder="예) 07:10" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
