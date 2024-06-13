import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceMemoInput({
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
      name={`schedules.${isEditing ? (editingScheduleIndex as number) : lastIndex}.place_memo`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>메모 (선택)</FormLabel>
          <FormControl>
            <Input type="text" {...field} placeholder="메모를 입력하세요" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
