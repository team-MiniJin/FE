'use client';

import {
  BackLink,
  DateCards,
  EditScheduleButton,
  getDateArray,
} from '@/shared';
import { useEffect, useState } from 'react';
import ScheduleCards from '@/shared/ui/ScheduleCards';
import PolylineMap from '@/widgets/polyline-map/ui/PolylineMap';
import SeeAllCourseButton from '@/shared/ui/SeeAllCourseButton';
import RemoveScheduleButton from '@/shared/ui/RemoveScheduleButton';
import PlanEditor from '@/widgets/plan-editor/ui/PlanEditor';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { usePlan } from '../model/usePlan';
import PlanSummary from './PlanSummary';
import CopyTravelButton from './CopyTravelButton';

export default function PlanDetail({
  planId,
  isMyPlan,
}: {
  planId: number;
  isMyPlan: boolean;
}) {
  const pathname = usePathname();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { data, mutateDeletePlan, isError, isLoading } = usePlan(
    planId,
    isMyPlan
  );
  const [activatedCardIndex, setActivatedCardIndex] = useState<number>(0);
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="animate-spin">
          <Image
            src="/image/loading.png"
            height={28}
            width={28}
            alt="loading"
          />
        </div>
      </div>
    );
  }

  if ((!isLoading && !data) || isError) {
    return (
      <div className="absolute inset-0 top-[-96px] flex h-screen flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-4 text-3xl font-bold">잘못된 요청입니다.</h1>
          <p className="mb-6 text-lg">
            요청하신 여행 일정을 찾을 수 없습니다. 다시 시도해 주세요.
          </p>
          <BackLink classNames="text-blue-500 hover:underline" />
        </div>
      </div>
    );
  }

  const filteredSchedules =
    data?.schedules.filter((s) => s.schedule_days === activatedCardIndex + 1) ||
    [];

  return (
    <>
      {data && (
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
                        mutateDeletePlan(planId);
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
                    <SeeAllCourseButton schedules={data.schedules} />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
