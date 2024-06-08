'use client';

import useCreatePlanStore from '../store/createPlanStore';
import DateCard from './DateCard';

export default function PlanDateList({ dateOfDays }: { dateOfDays: Date[] }) {
  const { activedDateCardIndex } = useCreatePlanStore();
  return (
    <ul className="flex space-x-2 ">
      {dateOfDays.map((date, idx) => (
        <li key={date.toString() + idx.toString()}>
          <DateCard
            date={date}
            idx={idx}
            isActived={activedDateCardIndex === idx}
          />
        </li>
      ))}
    </ul>
  );
}
