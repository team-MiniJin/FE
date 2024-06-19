import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { MutableRefObject } from 'react';
import { EditorPlanT } from '@/widgets/plan-editor/types/plan-editor-type';
import { DocumentT } from '../types/address-type';

export default function SearchedAddressItem({
  form,
  doc,
  curScheduleIndex,
  scheduleFields,
  setQueryText,
  placeNameRef,
}: {
  form: UseFormReturn<EditorPlanT, any, undefined>;
  doc: DocumentT;
  curScheduleIndex: number;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  setQueryText: React.Dispatch<React.SetStateAction<string>>;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
}) {
  const handleClickAddress = (address: string, x: string, y: string) => {
    if (curScheduleIndex < 0 || curScheduleIndex >= scheduleFields.length) {
      return;
    }

    form.setValue(`schedules.${curScheduleIndex}.place_addr`, address);
    form.setValue(`schedules.${curScheduleIndex}.x`, Number(x));
    form.setValue(`schedules.${curScheduleIndex}.y`, Number(y));

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
            handleClickAddress(doc.road_address.address_name, doc.x, doc.y);
          } else {
            handleClickAddress(doc.address_name, doc.x, doc.y);
          }
        }}
      >
        <div>{doc.address_name}</div>
      </button>
    </li>
  );
}
