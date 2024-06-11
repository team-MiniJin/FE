import { z } from 'zod';

const budgetSchema = z.object({
  budget_category: z.string(),
  cost: z.number().nonnegative(),
});

const scheduleSchema = z.object({
  schedule_day: z.number().nonnegative(),
  place_category: z.string().min(1, '장소 유형을 입력해 주세요.'),
  place_name: z.string().min(1, '검색을 통해 장소 이름을 넣어주세요.'),
  place_address: z.string().min(1, '검색을 통해 주소를 넣어주세요.'),
  region: z.string(),
  arrival_time: z
    .string()
    .min(3, '도착 시간을 입력해 주세요.')
    .regex(/^\d{2}:\d{2}$/, '입력 형식에 맞게 입력해 주세요. (ex: 08:10)'),
  budget: z.array(budgetSchema),
  x: z.number(),
  y: z.number(),
  place_memo: z.string(),
});

const createPlanFormSchema = z.object({
  user_id: z.number().int().nonnegative(),
  plan_name: z.string(),
  theme: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  scope: z.boolean(),
  number_of_members: z.number().int().nonnegative(),
  schedule: z.array(scheduleSchema),
});

export { createPlanFormSchema };
