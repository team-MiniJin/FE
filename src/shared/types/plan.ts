export interface BudgetT {
  budget_id?: number;
  budget_category: string;
  cost: number;
}

export interface ScheduleT {
  schedule_id: number;
  schedule_day: number;
  schedule_date: string;
  place_category: string;
  place_name: string;
  region: string;
  place_memo?: string;
  arrival_time: string;
  budgets?: BudgetT[];
  x: number;
  y: number;
  place_addr: string;
}
