import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { BudgetT, PlanT, ScheduleT } from '../types/create-plan';
import useCreatePlanStore from '../store/createPlanStore';
import EditPlace from './EditPlace';
import formatTime from '../util/formatTime';

export default function ScheduleByDayCard({
  form,
  schedule,
  scheduleFields,
  updateSchedule,
  removeSchedule,
}: {
  schedule: ScheduleT;
  form: UseFormReturn<PlanT, any, undefined>;
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  removeSchedule: UseFieldArrayRemove;
}) {
  const { setIsEditing, setEditingScheduleId, editingScheduleId } =
    useCreatePlanStore();
  return editingScheduleId === schedule.id ? (
    <EditPlace
      form={form}
      updateSchedule={updateSchedule}
      scheduleFields={scheduleFields}
      removeSchedule={removeSchedule}
    />
  ) : (
    <li className="relative flex items-center justify-between rounded-md border text-sm">
      <div className="flex items-center">
        <div className="flex flex-col items-center space-y-2 border-r p-6">
          <div className="font-bold">
            {formatTime(
              schedule.arrival_time.split(':')[0],
              schedule.arrival_time.split(':')[1],
              '시분'
            )}
          </div>
          <div className="w-[90px] text-center">
            {schedule.budget
              .reduce((prev: number, cur: BudgetT) => prev + cur.cost, 0)
              .toLocaleString()}
            원
          </div>
        </div>
        <div className="flex flex-col space-y-2 p-6">
          <div className="space-x-1">
            <span className="text-base font-bold">{schedule.place_name}</span>
            <span className="text-slate-500">({schedule.place_address})</span>
          </div>
          <div className="text-slate-400">{schedule.place_memo}</div>
        </div>
      </div>
      <div className="mr-6 flex space-x-4">
        <button
          type="button"
          aria-label="장소 삭제"
          onClick={() =>
            removeSchedule(
              scheduleFields.findIndex((item) => item.id === schedule.id)
            )
          }
        >
          <AiOutlineDelete className="text-xl" />
        </button>
        <button
          type="button"
          aria-label="장소 수정"
          onClick={() => {
            setIsEditing(true);
            setEditingScheduleId(schedule.id as string);
          }}
        >
          <AiOutlineEdit className="text-xl" />
        </button>
      </div>
    </li>
  );
}
