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
import { usePathname } from 'next/navigation';
import { usePlan } from '../model/usePlan';
import PlanSummary from './PlanSummary';
import deletePlan from '../api/deletePlan';
import CopyTravelButton from './CopyTravelButton';

export default function PlanDetail({ planId }: { planId: number }) {
  const pathname = usePathname();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { data } = usePlan(planId);
  const [activatedCardIndex, setActivatedCardIndex] = useState<number>(0);

  if (!data) {
    return null;
  }

  const filteredSchedules = data.schedules.filter(
    (s) => s.schedule_day === activatedCardIndex + 1
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
          <div className="absolute -left-2 z-20 inline-block">
            <BackLink />
          </div>
          <div className="relative space-y-8 pt-6">
            {pathname.split('/')[1] === 'exploring' ? (
              <div className="absolute right-0 top-[55px]">
                <CopyTravelButton planId={planId} />
              </div>
            ) : (
              <div className="absolute right-0 top-[55px] space-x-2">
                <EditScheduleButton
                  onClickHandler={() => {
                    setIsEditMode(true);
                  }}
                />
                <RemoveScheduleButton
                  onClickHandler={() => {
                    deletePlan(planId);
                  }}
                />
              </div>
            )}
            <PlanSummary plan={data} />
            <div className="h-[1px] w-full border-b"></div>
            <DateCards
              dates={getDateArray(
                data.start_date as string,
                data.end_date as string
              )}
              activatedCardIndex={activatedCardIndex}
              onClickHandler={setActivatedCardIndex}
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
