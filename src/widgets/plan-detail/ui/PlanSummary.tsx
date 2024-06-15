import {
  BookmarkWithCount,
  calculateStayDuration,
  PlanTheme,
  WayPoints,
} from '@/shared';
import { PlanDetailT } from '../type/plan-detail';

export default function PlanSummary({ plan }: { plan: PlanDetailT }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold">{plan?.plan_name}</h2>
        <PlanTheme theme={plan?.theme || ''} />
      </div>
      <div className="space-y-1">
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
        <div className="flex items-center space-x-2">
          <span>예산 {plan?.plan_budget.toLocaleString()}원</span>
          <span>|</span>
          <span>{plan?.number_of_members}명</span>
        </div>
        <div>
          <WayPoints waypoints={plan?.waypoints || []} />
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span>{plan?.scope ? '공개된 일정' : '비공개된 일정'}</span>
        <span className="mx-2">|</span>
        <span>
          <BookmarkWithCount count={plan?.number_of_scraps || 0} />
        </span>
      </div>
    </div>
  );
}
