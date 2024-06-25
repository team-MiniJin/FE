import {
  BookmarkWithCount,
  calculateStayDuration,
  EditScheduleButton,
  PlanTheme,
  RemoveScheduleButton,
  useAuth,
  WayPoints,
} from '@/shared';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { DeletePlanResponseT, PlanDetailT } from '../type/plan-detail';
import CopyTravelButton from './CopyTravelButton';

export default function PlanSummary({
  plan,
  mutateBookmark,
  isBookmarked,
  setIsEditMode,
  mutateDeletePlan,
}: {
  plan: PlanDetailT;
  mutateBookmark: any;
  isBookmarked: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  mutateDeletePlan: UseMutateFunction<
    DeletePlanResponseT,
    any,
    number,
    unknown
  >;
}) {
  const { jwt } = useAuth();
  const pathname = usePathname();

  const handleBookmarkClick = () => {
    mutateBookmark({ isDelete: isBookmarked, planId: plan.plan_id });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-row justify-between">
        <div className="mr-2 flex flex-row items-center space-x-4">
          <h2 className="truncate text-2xl font-bold">{plan?.plan_name}</h2>
          <PlanTheme theme={plan?.theme || ''} />
        </div>
        <div>
          {pathname.split('/')[1] === 'plan' ? (
            <CopyTravelButton planId={plan.plan_id} />
          ) : (
            <div className="space-x-2">
              <EditScheduleButton
                onClickHandler={() => {
                  setIsEditMode(true);
                }}
              />
              <RemoveScheduleButton
                onClickHandler={() => {
                  mutateDeletePlan(plan.plan_id);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <div className="">
          {pathname.split('/')[1] !== 'plan' ? (
            <div className="space-x-2">
              <span>{`${plan?.start_date} ~ ${plan?.end_date}`}</span>
              <span>
                (
                {calculateStayDuration(
                  plan?.start_date || '',
                  plan?.end_date || ''
                )}
                )
              </span>
            </div>
          ) : (
            <p>
              {calculateStayDuration(
                plan?.start_date || '',
                plan?.end_date || ''
              )}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span>{plan?.plan_budget?.toLocaleString()}원</span>
          <span>|</span>
          <span>{plan?.number_of_members}명</span>
        </div>
        <div>
          <WayPoints waypoints={plan?.region_list || []} />
        </div>
      </div>
      <div className="flex items-center text-sm">
        {pathname.split('/')[1] !== 'plan' && (
          <>
            <span>{plan?.scope ? '공개된 일정' : '비공개된 일정'}</span>
            <span className="mx-2">|</span>
          </>
        )}

        <Button variant="outline" onClick={handleBookmarkClick} disabled={!jwt}>
          <BookmarkWithCount
            count={plan.number_of_scraps}
            isBookmarked={isBookmarked}
          />
        </Button>
      </div>
    </div>
  );
}
