export interface PlaceT {
  place_name: string;
  region: string;
  place_memo: string;
  arrival_time: string; // 형식: HH:mm:ss
  budget: number;
  x: number;
  y: number;
}

export interface ScheduleT {
  schedule_date: string; // 형식: yyyy-MM-dd
  schedule_budget: number;
  place: PlaceT[];
}

export interface PlanT {
  user_id: number;
  plan_name: string;
  theme: string;
  start_date: string; // 형식: yyyy-MM-dd
  end_date: string; // 형식: yyyy-MM-dd
  plan_budget: number;
  scope: boolean;
  number_of_members: number;
  schedule: ScheduleT[];
}
