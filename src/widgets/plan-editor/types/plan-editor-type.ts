export interface EditorBudgetT {
  budget_category: string;
  cost: number;
}

export interface EditorScheduleT {
  // schedule_date: Date;
  id: string;
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
  start_date: Date; // yyyy-MM-dd
  end_date: Date; // yyyy-MM-dd
  scope: boolean;
  number_of_members: number;
  schedules: EditorScheduleT[];
}
