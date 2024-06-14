'use client';

import {
  BackLink,
  DateCards,
  EditScheduleButton,
  getDateArray,
} from '@/shared';
import { useState } from 'react';
import ScheduleCards from '@/shared/ui/ScheduleCards';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import SeeAllCourseButton from '@/shared/ui/SeeAllCourseButton';
import RemoveScheduleButton from '@/shared/ui/RemoveScheduleButton';
import PlanEditor from '@/widgets/plan-editor/ui/PlanEditor';
import { usePlan } from '../model/usePlan';
import PlanSummary from './PlanSummary';
import deletePlan from '../api/deletePlan';

export default function PlanDetail({ plan_id }: { plan_id: number }) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { data } = usePlan(plan_id);
  const [activedCardIndex, setActivedCardIndex] = useState<number>(0);

  if (!data) {
    return null;
  }

  const filteredSchedules = data.schedules.filter(
    (s) => s.schedule_day === activedCardIndex + 1
  );

  return (
    <>
      {isEditMode ? (
        <PlanEditor
          mode="edit"
          plan={data}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <>
          <div className="absolute -left-2 inline-block">
            <BackLink />
          </div>
          <div className="relative space-y-8 pt-6">
            <div className="absolute right-0 space-x-1 ">
              <RemoveScheduleButton
                onClickHandler={() => {
                  deletePlan(plan_id);
                }}
              />
              <EditScheduleButton
                onClickHandler={() => {
                  setIsEditMode(true);
                }}
              />
            </div>
            <PlanSummary plan={data} />
            <div className="h-[1px] w-full border-b"></div>
            <DateCards
              dates={getDateArray(data.start_date, data.end_date)}
              activedCardIndex={activedCardIndex}
              onClickHandler={setActivedCardIndex}
              disabled={false}
            />
            <div className="flex w-full space-x-[1%]">
              <div className="w-[49%]">
                <ScheduleCards schedules={filteredSchedules} />
              </div>
              <div className="flex h-[500px] w-[49%] flex-col justify-end space-y-3 rounded-md">
                <PolylineMap schedules={filteredSchedules} />
                <SeeAllCourseButton />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
