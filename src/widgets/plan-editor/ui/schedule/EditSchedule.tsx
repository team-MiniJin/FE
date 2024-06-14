import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import ScheduleRegistration from './ScheduleRegistration';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function EditSchedule({
  form,
  scheduleFields,
  updateSchedule,
  removeSchedule,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  updateSchedule: UseFieldArrayUpdate<EditorPlanT, 'schedules'>;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  removeSchedule: UseFieldArrayRemove;
}) {
  const { isEditing } = useCreatePlanStore();
  return (
    isEditing && (
      <ScheduleRegistration
        form={form}
        scheduleFields={scheduleFields}
        updateSchedule={updateSchedule}
        removeSchedule={removeSchedule}
        isEditMode
      />
    )
  );
}
