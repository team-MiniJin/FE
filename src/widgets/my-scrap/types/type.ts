export interface ScrapT {
  scrap_id: number;
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
}
