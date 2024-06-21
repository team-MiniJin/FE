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
  number_of_scraps: number;
  region_list: string[];
  schedules: ScheduleT[];
  plan_budget: number;
}

export interface DeletePlanResponseT {
  success: boolean;
  message: string;
  plan_id: number;
}

export interface CopiedPlanResponseT {
  message: string;
  plan_id: number;
  number_of_scraps: number;
  created_at: string; // "yyyy-MM-dd HH:mm:ss"
  updated_at: string; // "yyyy-MM-dd HH:mm:ss"
}
