import { ScheduleT } from '@/shared';

export interface PlanDetailT {
  plan_id: number;
  user_id: number;
  plan_name: string;
  theme: string;
  start_date: string;
  end_date: string;
  scope: boolean;
  number_of_members: number;
  number_of_likes: number;
  number_of_scraps: number;
  waypoints: string[];
  schedules: ScheduleT[];
  plan_budget: number;
}
