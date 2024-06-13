import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import formatTime from '../utils/formatTime';
import { BudgetT, ScheduleT } from '../types/plan';

export default function ScheduleCards({
  schedules,
  handleRemove,
  handleEdit,
}: {
  schedules: ScheduleT[];
  handleRemove?: (id: number) => void;
  handleEdit?: (id: number) => void;
}) {
  return (
    <ul className="space-y-4">
      {schedules.map((schedule: ScheduleT) => {
        return (
          <li
            key={schedule.schedule_id}
            className="relative flex items-center justify-between rounded-md border text-sm"
          >
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
                  {Array.isArray(schedule.budgets)
                    ? schedule.budgets
                        .reduce(
                          (prev: number, cur: BudgetT) => prev + cur.cost,
                          0
                        )
                        .toLocaleString()
                    : '0'}
                  원
                </div>
              </div>
              <div className="flex flex-col space-y-2 p-6">
                <div className="space-x-1">
                  <span className="text-base font-bold">
                    {schedule.place_name}
                  </span>
                  <span className="text-slate-500">
                    ({schedule.place_addr})
                  </span>
                </div>
                <div className="text-slate-400">{schedule.place_memo}</div>
              </div>
            </div>
            {handleRemove && handleEdit && (
              <div className="mr-6 flex space-x-4">
                <button
                  type="button"
                  aria-label="장소 삭제"
                  onClick={() => handleRemove(schedule.schedule_id)}
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
                <button
                  type="button"
                  aria-label="장소 수정"
                  onClick={() => handleEdit(schedule.schedule_id)}
                >
                  <AiOutlineEdit className="text-xl" />
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
