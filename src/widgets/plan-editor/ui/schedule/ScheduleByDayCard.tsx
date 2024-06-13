import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import formatTime from '@/shared/utils/formatTime';
import { EditScheduleButton, RemoveScheduleButton } from '@/shared';
import useCreatePlanStore from '../../store/usePlanEditorStore';
import EditPlace from './EditSchedule';
import {
  EditorBudgetT,
  EditorPlanT,
  EditorScheduleT,
} from '../../types/plan-editor-type';

export default function ScheduleByDayCard({
  form,
  idx,
  schedule,
  scheduleFields,
  updateSchedule,
  removeSchedule,
}: {
  schedule: EditorScheduleT;
  idx: number;
  form: UseFormReturn<EditorPlanT, any, undefined>;
  updateSchedule: UseFieldArrayUpdate<EditorPlanT, 'schedules'>;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  removeSchedule: UseFieldArrayRemove;
}) {
  const { setIsEditing, setEditingScheduleIndex, editingScheduleIndex } =
    useCreatePlanStore();
  console.log(editingScheduleIndex, '0111');
  return editingScheduleIndex === idx ? (
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
            {schedule?.budgets
              ?.reduce((prev: number, cur: EditorBudgetT) => prev + cur.cost, 0)
              .toLocaleString()}
            원
          </div>
        </div>
        <div className="flex flex-col space-y-2 p-6">
          <div className="space-x-1">
            <span className="text-base font-bold">{schedule.place_name}</span>
            <span className="text-slate-500">({schedule.place_addr})</span>
          </div>
          <div className="text-slate-400">{schedule.place_memo}</div>
        </div>
      </div>
      <div className="mr-6 flex space-x-4">
        <RemoveScheduleButton
          onClickHandler={() => {
            removeSchedule(
              scheduleFields.findIndex((item) => item.id === schedule.id)
            );
          }}
        />
        <EditScheduleButton
          onClickHandler={() => {
            setIsEditing(true);
            setEditingScheduleIndex(idx);
          }}
        />
      </div>
    </li>
  );
}
