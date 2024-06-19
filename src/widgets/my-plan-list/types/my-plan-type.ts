export interface MyPlanScheduleT {
  schedule_id: number;
  schedule_date: string; // "yyyy-MM-dd"
  place_addr: string;
  place_category: string;
  place_name: string;
  arrival_time: string;
  x: number; // Longitude
  y: number; // Latitude
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
  region_list: string[];
  schedules: MyPlanScheduleT[];
}

export type FetchMyPlanSuccessT = { data: MyPlanT[]; next_cursor?: number };
