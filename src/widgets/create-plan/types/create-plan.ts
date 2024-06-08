export interface BudgetT {
  budget_category: string;
  cost: number;
}

export interface ScheduleT {
  id?: string;
  schedule_day: number;
  place_category: string;
  place_name: string;
  place_address: string;
  region: string;
  arrival_time: string; // HH:mm
  budget: BudgetT[];
  x: number;
  y: number;
  place_memo: string;
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
