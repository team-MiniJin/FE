import {
  BookmarkWithCount,
  calculateStayDuration,
  PlanTheme,
  useAuth,
  WayPoints,
} from '@/shared';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PlanDetailT } from '../type/plan-detail';

export default function PlanSummary({
  plan,
  mutateBookmark,
  isBookmarked,
}: {
  plan: PlanDetailT;
  mutateBookmark: any;
  isBookmarked: boolean;
}) {
  const { jwt } = useAuth();
  const pathname = usePathname();
  const [isBookmark, setIsBookmark] = useState<boolean>(isBookmarked);
  const handleBookmarkClick = () => {
    mutateBookmark({ isDelete: isBookmark, planId: plan.plan_id });
    setIsBookmark(!isBookmark);
  };

  const getBookmarkCount = () => {
    let count = plan.number_of_scraps || 0;
    if (isBookmarked && !isBookmark) {
      count -= 1;
    } else if (!isBookmarked && isBookmark) {
      count += 1;
    }
    return count;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold">{plan?.plan_name}</h2>
        <PlanTheme theme={plan?.theme || ''} />
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
            count={getBookmarkCount()}
            isBookmarked={isBookmark}
          />
        </Button>
      </div>
    </div>
  );
}
