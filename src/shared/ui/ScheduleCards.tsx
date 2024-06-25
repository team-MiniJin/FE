import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useState, useRef, useEffect } from 'react';
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
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [height, setHeight] = useState<{ [key: number]: string }>({});
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleAccordion = (id: number) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: number
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion(id);
    }
  };

  useEffect(() => {
    const initialHeights = schedules.reduce(
      (acc, schedule) => {
        const contentEl = contentRefs.current[schedule.schedule_id];
        if (contentEl) {
          acc[schedule.schedule_id] = `${contentEl.scrollHeight}px`;
        }
        return acc;
      },
      {} as { [key: number]: string }
    );
    setHeight(initialHeights);
  }, [schedules]);

  useEffect(() => {
    if (openAccordion !== null) {
      const contentEl = contentRefs.current[openAccordion];
      if (contentEl) {
        setHeight((prev) => ({
          ...prev,
          [openAccordion]: `${contentEl.scrollHeight}px`,
        }));
      }
    }
  }, [openAccordion]);

  if (schedules.length === 0)
    return <p className="text-center text-xs"> 아직 등록된 장소가 없어요!</p>;
  return (
    <ul className="space-y-4">
      {schedules.map((schedule: ScheduleT) => (
        <li
          key={schedule.schedule_id}
          className="relative flex flex-col rounded-md border text-sm"
        >
          <div
            className="flex h-[140px] cursor-pointer items-center justify-between"
            onClick={() => toggleAccordion(schedule.schedule_id)}
            onKeyDown={(event) => handleKeyDown(event, schedule.schedule_id)}
            role="button"
            tabIndex={0}
          >
            <div className="flex h-full items-center">
              <div className="flex h-full flex-col items-center justify-center space-y-2 border-r p-6">
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
              <div className="flex h-full flex-col justify-center p-6">
                <div className="text-xs ">{schedule.place_category}</div>
                <div className="mb-2 mt-0.5 space-x-1">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(schedule.schedule_id);
                  }}
                >
                  <AiOutlineDelete className="text-xl" />
                </button>
                <button
                  type="button"
                  aria-label="장소 수정"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(schedule.schedule_id);
                  }}
                >
                  <AiOutlineEdit className="text-xl" />
                </button>
              </div>
            )}
          </div>
          <div
            ref={(el) => {
              if (el) contentRefs.current[schedule.schedule_id] = el;
            }}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              height:
                openAccordion === schedule.schedule_id
                  ? height[schedule.schedule_id]
                  : '0px',
            }}
          >
            <div className="border-t p-6">
              <h4 className="text-base font-bold">예산 목록</h4>
              <ul className="mt-2 space-y-1">
                {schedule.budgets && schedule.budgets.length > 0 ? (
                  schedule.budgets.map((budget: BudgetT, index: number) => (
                    <li key={index} className="flex justify-between">
                      <span>{budget.budget_category}</span>
                      <span>{budget.cost.toLocaleString()} 원</span>
                    </li>
                  ))
                ) : (
                  <p>추가한 예산 항목이 없습니다.</p>
                )}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
