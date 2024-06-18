import { ScheduleT } from '@/shared';

export interface EditorBudgetT {
  budget_category: string;
  cost: string;
}

export interface EditorScheduleT {
  // schedule_date: Date;
  id: number;
  place_category: string;
  place_name: string;
  place_addr: string;
  region: string;
  place_memo: string;
  arrival_time: string; // HH:mm
  budgets: EditorBudgetT[];
  x: number;
  y: number;
  schedule_day: number;
}

export interface EditorPlanT {
  // user_id: number;
  plan_name: string;
  theme: string;
  start_date: Date;
  end_date: Date;
  scope: boolean;
  number_of_members: number;
  schedules: EditorScheduleT[] | ScheduleT[];
}

export interface PostNewScheduleT {
  schedule_date: string; // yyyy-MM-dd
  place_category: string;
  place_name: string;
  place_addr: string;
  region: string;
  place_memo: string;
  arrival_time: string; // HH:mm:ss
  budgets: EditorBudgetT[];
  x: number;
  y: number;
}
export interface PostNewPlanT {
  plan_name: string;
  theme: string;
  start_date: string; // yyyy-MM-dd
  end_date: string; // yyyy-MM-dd
  scope: boolean;
  number_of_members: number;
  schedules: PostNewScheduleT[];
}
