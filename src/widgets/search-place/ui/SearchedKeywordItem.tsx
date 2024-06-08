import { PlanT, ScheduleT } from '@/widgets/create-plan/types/create-plan';
import {
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { MutableRefObject } from 'react';
import { DocumentT } from '../types/keyword';

export default function SearchedKeywordItem({
  doc,
  form,
  curScheduleIndex,
  scheduleFields,
  updateSchedule,
  setQueryText,
  placeNameRef,
}: {
  doc: DocumentT;
  form: UseFormReturn<PlanT, any, undefined>;
  curScheduleIndex: number;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
  setQueryText: React.Dispatch<React.SetStateAction<string>>;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
}) {
  const handleClickKeyword = (name: string, address: string) => {
    if (curScheduleIndex < 0 || curScheduleIndex >= scheduleFields.length) {
      // console.error('Invalid schedule index');
      return;
    }
    // console.log(name, address);
    form.setValue(`schedule.${curScheduleIndex}.place_name`, name);
    form.setValue(`schedule.${curScheduleIndex}.place_address`, address);
    if (placeNameRef.current) {
      placeNameRef.current.readOnly = true;
      placeNameRef.current.classList.add('bg-slate-200');
    }
    setQueryText('');
  };
  return (
    <li>
      <button
        type="button"
        className="w-full py-1 text-left hover:bg-slate-50"
        onClick={() =>
          handleClickKeyword(doc.place_name, doc.road_address_name)
        }
      >
        <div>{doc.place_name}</div>
        <div className="text-xs"> {doc.address_name}</div>
      </button>
    </li>
  );
}
