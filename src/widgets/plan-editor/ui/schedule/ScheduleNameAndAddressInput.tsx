import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { MutableRefObject } from 'react';
import SearchPlaceBar from '@/widgets/search-place/ui/SearchPlaceBar';
import { EditorPlanT } from '../../types/plan-editor-type';
import usePlanEditorStore from '../../store/usePlanEditorStore';

export default function PlaceNameAndAddressInput({
  form,
  curIndex,
  placeNameRef,
  scheduleFields,
  updateSchedule,
}: {
  form: UseFormReturn<EditorPlanT>;
  curIndex: number;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  updateSchedule: UseFieldArrayUpdate<EditorPlanT, 'schedules'>;
}) {
  const { editingScheduleIndex, isEditing } = usePlanEditorStore();

  return (
    <div className="space-y-2">
      <Label htmlFor="">이름 및 위치</Label>
      <SearchPlaceBar
        form={form}
        updateSchedule={updateSchedule}
        scheduleFields={scheduleFields}
        curScheduleIndex={curIndex}
        placeNameRef={placeNameRef}
      />
      <FormField
        control={form.control}
        name={`schedules.${isEditing ? (editingScheduleIndex as number) : curIndex}.place_name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                ref={placeNameRef}
                className="bg-slate-200"
                type="text"
                placeholder="장소 이름"
                readOnly
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`schedules.${editingScheduleIndex ? editingScheduleIndex - 1 : curIndex}.place_addr`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                className="bg-slate-200"
                type="text"
                placeholder="장소 위치"
                readOnly
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
