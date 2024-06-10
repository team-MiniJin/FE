export interface MyPlanScheduleT {
  schedule_id: number;
  schedule_date: string; // "yyyy-MM-dd"
  place_name: string;
  arrival_time: string; // "HH:mm:ss"
  x: number; // double
  y: number; // double
}

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
  schedule: MyPlanScheduleT[];
}

export type FetchMyPlanSuccessT = { data: MyPlanT[]; nextCursor?: number };
