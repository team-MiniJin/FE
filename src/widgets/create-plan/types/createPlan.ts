export interface BudgetT {
  budget_category: string;
  cost: number;
  budget_memo: string;
}

export interface ScheduleT {
  schedule_date: string; // yyyy-MM-dd
  place_category: string;
  place_name: string;
  region: string;
  place_memo: string;
  arrival_time: string; // HH:mm:ss
  budget: BudgetT[];
  x: number;
  y: number;
}

export interface PlanT {
  user_id: number;
  plan_name: string;
  theme: string;
  start_date: Date; // yyyy-MM-dd
  end_date: Date; // yyyy-MM-dd
  scope: boolean;
  number_of_members: number;
  schedule: ScheduleT[];
}
