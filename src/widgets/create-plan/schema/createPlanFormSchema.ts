import { z } from 'zod';

const budgetSchema = z.object({
  budget_category: z.string(),
  cost: z.number().int(),
  budget_memo: z.string(),
});

const scheduleSchema = z.object({
  schedule_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected yyyy-MM-dd'),
  place_category: z.string(),
  place_name: z.string(),
  region: z.string(),
  place_memo: z.string(),
  arrival_time: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, 'Invalid time format, expected HH:mm:ss'),
  budget: z.array(budgetSchema),
  x: z.number(),
  y: z.number(),
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
