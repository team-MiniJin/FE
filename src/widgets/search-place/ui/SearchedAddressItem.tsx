import { PlanT, ScheduleT } from '@/widgets/create-plan/types/create-plan';
import {
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { MutableRefObject } from 'react';
import { DocumentT } from '../types/address';

export default function SearchedAddressItem({
  form,
  doc,
  curScheduleIndex,
  scheduleFields,
  setQueryText,
  placeNameRef,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  doc: DocumentT;
  curScheduleIndex: number;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  setQueryText: React.Dispatch<React.SetStateAction<string>>;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
}) {
  const handleClickAddress = (address: string) => {
    console.log(address);
    if (curScheduleIndex < 0 || curScheduleIndex >= scheduleFields.length) {
      // console.error('Invalid schedule index');
      return;
    }
    form.setValue(`schedule.${curScheduleIndex}.place_address`, address);
    setQueryText('');
    if (placeNameRef.current) {
      placeNameRef.current.value = '';
      placeNameRef.current.readOnly = false;
      placeNameRef.current.classList.remove('bg-slate-200');
      placeNameRef.current.focus();
    }
  };
  return (
    <li>
      <button
        type="button"
        className="w-full py-1 text-left hover:bg-slate-50"
        onClick={() => {
          if (doc.road_address) {
            handleClickAddress(doc.road_address.address_name);
          } else {
            handleClickAddress(doc.address_name);
          }
        }}
      >
        {doc.address && doc.road_address ? (
          <>
            <div>{doc.road_address.address_name}</div>
            <div className="text-xs">
              {doc.address.address_name}
              <span className="ml-1">({doc.road_address.zone_no})</span>
            </div>
          </>
        ) : (
          <>
            <div>{doc.address_name}</div>
          </>
        )}
      </button>
    </li>
  );
}
