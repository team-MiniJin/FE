export interface UserTravelScheduleT {
  schedule_id: number;
  schedule_date: string;
  place_name: string;
  region: string;
  arrival_time: string;
  x: number;
  y: number;
  place_addr: string;
  place_category: string;
}

export interface UserTravelPlanT {
  plan_id: number;
  user_nickname: string | null;
  plan_name: string;
  theme: string;
  start_date: string;
  end_date: string;
  plan_budget: number;
  scope: boolean;
  number_of_members: number;
  number_of_scraps: number;
  region_list: string[];
  schedules: UserTravelScheduleT[];
}

export type GetUserTravelPlanSuccessT = {
  data: UserTravelPlanT[];
  next_cursor?: number;
};

export type SortType = 'newest' | 'scraps';
