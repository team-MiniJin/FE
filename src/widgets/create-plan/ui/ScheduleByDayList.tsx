import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { PlanT } from '../types/create-plan';
import ScheduleByDayCard from './ScheduleByDayCard';
import useCreatePlanStore from '../store/createPlanStore';

export default function ScheduleByDayList({
  form,
  scheduleFields,
  updateSchedule,
  removeSchedule,
}: {
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
  form: UseFormReturn<PlanT, any, undefined>;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
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
