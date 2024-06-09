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
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import SearchPlaceBar from '@/widgets/search-place/ui/SearchPlaceBar';

export default function PlaceNameAndAddressInput({
  form,
  lastIndex,
  placeNameRef,
  scheduleFields,
  updateSchedule,
}: {
  form: UseFormReturn<PlanT>;
  lastIndex: number;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="">이름 및 위치</Label>
      <SearchPlaceBar
        form={form}
        updateSchedule={updateSchedule}
        scheduleFields={scheduleFields}
        curScheduleIndex={lastIndex}
        placeNameRef={placeNameRef}
      />
      <FormField
        control={form.control}
        name={`schedule.${lastIndex}.place_name`}
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
        name={`schedule.${lastIndex}.place_address`}
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
