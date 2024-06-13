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
  lastIndex,
}: {
  form: UseFormReturn<EditorPlanT>;
  lastIndex: number;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();

  return (
    <FormField
      control={form.control}
      name={`schedules.${isEditing ? (editingScheduleIndex as number) : lastIndex}.arrival_time`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>도착 시간</FormLabel>
          <FormControl>
            <Input {...field} type="text" placeholder="HH:mm (예: 07:10)" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
