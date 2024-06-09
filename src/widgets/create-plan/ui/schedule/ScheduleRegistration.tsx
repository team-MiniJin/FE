import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import { useRef } from 'react';
import PlaceTypeInput from './ScheduleTypeInput';
import HiddenScheduleInputs from './HiddenScheduleInputs';
import PlaceNameAndAddressInput from './ScheduleNameAndAddressInput';
import PlaceArrivalTimeInput from './ScheduleArrivalTimeInput';
import PlaceBudgetList from './ScheduleBudgetList';
import PlaceMemoInput from './ScheduleMemoInput';
import CancelScheduleButton from './CancelScheduleButton';
import UpdateScheduleButton from './UpdateScheduleButton';

export default function PlaceRegistration({
  scheduleFields,
  updateSchedule,
  removeSchedule,
  form,
  isEditMode = false,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
  removeSchedule: UseFieldArrayRemove;
  isEditMode?: boolean;
}) {
  const placeNameRef = useRef<HTMLInputElement | null>(null);
  const lastIndex = scheduleFields.length - 1;

  return (
    <div className="space-y-2 rounded-md border p-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">
          {isEditMode ? '장소 수정' : '어떤 곳으로 가시나요?'}
        </h3>
      </div>
      <div className="flex flex-col space-y-4">
        <HiddenScheduleInputs form={form} lastIndex={lastIndex} />
        <PlaceTypeInput form={form} lastIndex={lastIndex} />
        <PlaceNameAndAddressInput
          form={form}
          lastIndex={lastIndex}
          placeNameRef={placeNameRef}
          scheduleFields={scheduleFields}
          updateSchedule={updateSchedule}
        />
        <PlaceArrivalTimeInput form={form} lastIndex={lastIndex} />
        <PlaceBudgetList form={form} lastIndex={lastIndex} />
        <PlaceMemoInput form={form} lastIndex={lastIndex} />
      </div>
      <div className="!mt-10 flex justify-center space-x-4">
        <CancelScheduleButton
          lastIndex={lastIndex}
          removeSchedule={removeSchedule}
        />
        <UpdateScheduleButton
          form={form}
          lastIndex={lastIndex}
          updateSchedule={updateSchedule}
        />
      </div>
    </div>
  );
}
