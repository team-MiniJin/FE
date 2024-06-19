import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { useRef } from 'react';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import PlaceTypeInput from './ScheduleTypeInput';
import PlaceNameAndAddressInput from './ScheduleNameAndAddressInput';
import PlaceArrivalTimeInput from './ScheduleArrivalTimeInput';
import PlaceBudgets from '../budget/ScheduleBudgets';
import PlaceMemoInput from './ScheduleMemoInput';
import CancelScheduleButton from './CancelScheduleButton';
import UpdateScheduleButton from './UpdateScheduleButton';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function ScheduleRegistration({
  scheduleFields,
  updateSchedule,
  removeSchedule,
  form,
  isEditMode = false,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  updateSchedule: UseFieldArrayUpdate<EditorPlanT, 'schedules'>;
  removeSchedule: UseFieldArrayRemove;
  isEditMode?: boolean;
}) {
  const { isEditing, editingScheduleIndex } = useCreatePlanStore();
  const placeNameRef = useRef<HTMLInputElement | null>(null);
  const curIndex = isEditing
    ? (editingScheduleIndex as number)
    : scheduleFields.length - 1;

  return (
    <div className="space-y-2 rounded-md border p-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">
          {isEditMode ? '장소 수정' : '어떤 곳으로 가시나요?'}
        </h3>
      </div>
      <div className="flex flex-col space-y-4">
        <PlaceTypeInput form={form} curIndex={curIndex} />
        <PlaceNameAndAddressInput
          form={form}
          curIndex={curIndex}
          placeNameRef={placeNameRef}
          scheduleFields={scheduleFields}
          updateSchedule={updateSchedule}
        />
        <PlaceArrivalTimeInput form={form} curIndex={curIndex} />
        <PlaceBudgets form={form} curIndex={curIndex} />
        <PlaceMemoInput form={form} curIndex={curIndex} />
      </div>
      <div className="!mt-10 flex justify-center space-x-4">
        <CancelScheduleButton
          curIndex={curIndex}
          removeSchedule={removeSchedule}
        />
        <UpdateScheduleButton
          form={form}
          curIndex={curIndex}
          updateSchedule={updateSchedule}
        />
      </div>
    </div>
  );
}
