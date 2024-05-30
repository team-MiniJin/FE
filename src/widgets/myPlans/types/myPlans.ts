interface PlaceT {
  place_id: number;
  place_name: string;
  arrival_time: string; // "HH:mm:ss"
  x: number; // double
  y: number; // double
}

interface ScheduleT {
  schedule_id: number;
  schedule_date: string; // "yyyy-MM-dd"
  place: PlaceT[];
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
  schedule: ScheduleT[];
  regions: string[];
}

export type FetchMyPlanSuccessT = { data: MyPlanT[]; nextCursor?: number };
export type FetchMyPlanErrorT = { success: false; message: string };
