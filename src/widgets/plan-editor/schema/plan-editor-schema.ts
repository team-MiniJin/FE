import { z } from 'zod';

const planEditorFormBudgetSchema = z.object({
  budget_category: z.string().min(1, '지출 내용을 입력해 주세요.'),
  cost: z
    .number({
      invalid_type_error: '숫자를 입력해 주세요.',
    })
    .min(1, '지출 비용은 1원 이상을 입력해 주세요.'),
});

const planEditorFormScheduleSchema = z.object({
  place_category: z.string().min(1, '장소 유형을 입력해 주세요.'),
  place_name: z.string().min(1, '검색을 통해 장소 이름을 넣어주세요.'),
  place_addr: z.string().min(1, '검색을 통해 주소를 넣어주세요.'),
  region: z.string(),
  arrival_time: z
    .string()
    .min(3, '도착 시간을 입력해 주세요.')
    .regex(/^\d{2}:\d{2}$/, '입력 형식에 맞게 입력해 주세요. (ex: 8:10)'),
  budgets: z.array(planEditorFormBudgetSchema),
  x: z.number(),
  y: z.number(),
  place_memo: z.string(),
  schedule_day: z.number().nonnegative(),
});

const planEditorFormPlanSchema = z.object({
  plan_name: z.string(),
  theme: z.string(),
  start_date: z.date(),
  end_date: z.date(),
  scope: z.boolean(),
  number_of_members: z.number().int().nonnegative(),
  schedules: z.array(planEditorFormScheduleSchema),
});

export { planEditorFormPlanSchema };
