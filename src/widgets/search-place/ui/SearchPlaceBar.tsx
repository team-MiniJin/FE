'use client';

import { SearchBar } from '@/shared';
import { MutableRefObject, useState } from 'react';
import {
  FieldArrayWithId,
  UseFieldArrayUpdate,
  UseFormReturn,
} from 'react-hook-form';
import { PlanT } from '@/widgets/create-plan/types/create-plan';
import SearchedKeywordItem from './SearchedKeywordItem';
import SearchedAddressItem from './SearchedAddressItem';
import { useSearchPlace } from '../model/useSearchPlace';

export default function SearchPlaceBar({
  form,
  updateSchedule,
  scheduleFields,
  curScheduleIndex,
  placeNameRef,
}: {
  form: UseFormReturn<PlanT, any, undefined>;
  updateSchedule: UseFieldArrayUpdate<PlanT, 'schedule'>;
  scheduleFields: FieldArrayWithId<PlanT, 'schedule', 'id'>[];
  curScheduleIndex: number;
  placeNameRef: MutableRefObject<HTMLInputElement | null>;
}) {
  const [queryText, setQueryText] = useState<string>('');

  const { keywordQMutate, addressQMutate, debouncedMutate } = useSearchPlace();
  const properties = {
    placeholder: '키워드 또는 주소를 입력해 주세요.',
    value: queryText,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setQueryText(e.target.value);
      debouncedMutate(e.target.value);
    },
  };

  return (
    <div className="relative">
      <SearchBar {...properties} />
      {queryText && (
        <div className="absolute z-50 max-h-[380px] w-full overflow-y-scroll bg-white p-4 text-sm shadow-md">
          <span className="inline-block py-1 font-bold">장소</span>
          {keywordQMutate.data && keywordQMutate.data?.documents.length > 0 ? (
            <ul className="space-y-1 ">
              {keywordQMutate.data?.documents.map((doc) => (
                <SearchedKeywordItem
                  key={doc.id}
                  doc={doc}
                  form={form}
                  curScheduleIndex={curScheduleIndex}
                  placeNameRef={placeNameRef}
                  scheduleFields={scheduleFields}
                  updateSchedule={updateSchedule}
                  setQueryText={setQueryText}
                />
              ))}
            </ul>
          ) : (
            <div className="py-1">검색된 장소가 없습니다.</div>
          )}
          <div className="my-3 h-[1px] w-full border-b" />
          <span className="inline-block py-1 font-bold">주소</span>
          {addressQMutate.data && addressQMutate.data?.documents.length > 0 ? (
            <ul className="space-y-1 ">
              {addressQMutate.data?.documents.map(
                (doc) =>
                  doc.address_name && (
                    <SearchedAddressItem
                      key={`${doc.x}-${doc.y}`}
                      doc={doc}
                      curScheduleIndex={curScheduleIndex}
                      placeNameRef={placeNameRef}
                      scheduleFields={scheduleFields}
                      updateSchedule={updateSchedule}
                      setQueryText={setQueryText}
                    />
                  )
              )}
            </ul>
          ) : (
            <div className="py-1">검색된 주소가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
