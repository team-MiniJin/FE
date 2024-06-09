import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import PlaceRegistration from './ScheduleRegistration';
import { PlanT } from '../../types/create-plan';
import useCreatePlanStore from '../../store/createPlanStore';

export default function EditSchedule({
  form,
  scheduleFields,
  updateSchedule,
  removeSchedule,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  removeSchedule: UseFieldArrayRemove;
}) {
  const { isEditing } = useCreatePlanStore();
  return (
    isEditing && (
      <PlaceRegistration
        form={form}
        scheduleFields={scheduleFields}
        updateSchedule={updateSchedule}
        removeSchedule={removeSchedule}
        isEditMode
      />
    )
  );
}
