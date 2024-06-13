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
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceTypeInput({
  form,
  lastIndex,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  lastIndex: number;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();

  return (
    <FormField
      control={form.control}
      name={`schedules.${isEditing ? (editingScheduleIndex as number) : lastIndex}.place_category`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>장소 유형</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="text"
              placeholder="어떤 장소인가요? (예: 집, 음식점)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
