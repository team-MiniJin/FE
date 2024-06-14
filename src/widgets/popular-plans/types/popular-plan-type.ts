export interface PopularPlanT {
  plan_id: number;
  user_id: number;
  user_nickname: string;
  plan_name: string;
  theme: string;
  start_date: string;
  end_date: string;
  scope: boolean;
  number_of_members: number;
  number_of_likes: number;
  number_of_scraps: number;
  plan_budget: number;
  waypoints: string[];
  schedules: any[];
}
