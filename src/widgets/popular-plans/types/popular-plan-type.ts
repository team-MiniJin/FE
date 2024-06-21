export interface PopularPlanT {
  plan_id: number;
  user_id: number;
  user_nickname: string;
  plan_name: string;
  theme: string;
  start_date: string; // "yyyy-MM-dd" 형식
  end_date: string; // "yyyy-MM-dd" 형식
  plan_budget: number;
  number_of_members: number;
  number_of_scraps: number;
}
