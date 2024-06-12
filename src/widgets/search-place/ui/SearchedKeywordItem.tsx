import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';
import { MutableRefObject } from 'react';
import { EditorPlanT } from '@/widgets/plan-editor/types/plan-editor-type';
import { DocumentT } from '../types/keyword';

export default function SearchedKeywordItem({
  doc,
  form,
  curScheduleIndex,
  scheduleFields,
  setQueryText,
  placeNameRef,
}: {
  doc: DocumentT;
  form: UseFormReturn<EditorPlanT, any, undefined>;
  curScheduleIndex: number;
  scheduleFields: FieldArrayWithId<EditorPlanT, 'schedules', 'id'>[];
  setQueryText: React.Dispatch<React.SetStateAction<string>>;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
}) {
  const handleClickKeyword = (name: string, address: string) => {
    console.log(address, form.getValues().schedules[curScheduleIndex]);
    if (curScheduleIndex < 0 || curScheduleIndex >= scheduleFields.length) {
      return;
    }
    form.setValue(`schedules.${curScheduleIndex}.place_name`, name);
    form.setValue(`schedules.${curScheduleIndex}.place_addr`, address);
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
          handleClickKeyword(
            doc.place_name,
            doc.address_name || doc.road_address_name
          )
        }
      >
        <div>{doc.place_name}</div>
        <div className="text-xs">
          {doc.address_name || doc.road_address_name}
        </div>
      </button>
    </li>
  );
}
