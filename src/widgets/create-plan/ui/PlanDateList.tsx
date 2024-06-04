'use client';

import { useState } from 'react';
import DateCard from './DateCard';

export default function PlanDateList({ dateOfDays }: { dateOfDays: Date[] }) {
  const [activedDateCardIndex, setActivedDateCardIndex] = useState<number>(0);

  return (
    <ul className="flex space-x-2 ">
      {dateOfDays.map((date, idx) => (
        <li key={date.toString() + idx.toString()}>
          <DateCard
            date={date}
            idx={idx}
            isActived={activedDateCardIndex === idx}
            setIndextOfActivedDateCard={setActivedDateCardIndex}
          />
        </li>
      ))}
    </ul>
  );
}
