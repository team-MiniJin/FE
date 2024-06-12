import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import ScheduleByDayCard from './ScheduleByDayCard';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import { EditorPlanT } from '../../types/plan-editor-type';

export default function ScheduleByDayList({
  form,
  scheduleFields,
  updateSchedule,
  removeSchedule,
}: {
  updateSchedule: UseFieldArrayUpdate<EditorPlanT, 'schedules'>;
  form: UseFormReturn<EditorPlanT, any, undefined>;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  removeSchedule: UseFieldArrayRemove;
}) {
  const { activedDateCardIndex } = useCreatePlanStore();
  const filterdSchedules = scheduleFields.filter(
    (value) =>
      value.schedule_day === activedDateCardIndex && value.place_category
  );
  return (
    <ul className="space-y-4">
      {filterdSchedules.map((schedule) => (
        <ScheduleByDayCard
          form={form}
          scheduleFields={scheduleFields}
          schedule={schedule}
          key={schedule.id}
          removeSchedule={removeSchedule}
          updateSchedule={updateSchedule}
        />
      ))}
    </ul>
  );
}
