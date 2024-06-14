import { ScheduleT } from '@/shared';

export interface MyPlanT {
  plan_id: number;
  user_id: number;
  plan_name: string;
  theme: string;
  start_date: string; // "yyyy-MM-dd"
  end_date: string; // "yyyy-MM-dd"
  plan_budget: number;
  scope: boolean;
  number_of_members: number;
  number_of_likes: number;
  number_of_scraps: number;
  waypoints: string[];
  schedule: ScheduleT[];
}

export type FetchMyPlanSuccessT = { data: MyPlanT[]; nextCursor?: number };
