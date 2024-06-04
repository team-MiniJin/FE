import { z } from 'zod';

const placeSchema = z.object({
  place_name: z.string(),
  region: z.string(),
  place_memo: z.string(),
  arrival_time: z
    .string()
    .regex(/^\d{2}:\d{2}:\d{2}$/, 'Invalid time format, expected HH:mm:ss'),
  budget: z.number().int(),
  x: z.number(),
  y: z.number(),
});

const scheduleSchema = z.object({
  schedule_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, expected yyyy-MM-dd'),
  schedule_budget: z.number().int(),
  place: z.array(placeSchema),
});

const createFormSchema = z.object({
  user_id: z.number().int().nonnegative(),
  plan_name: z.string(),
  theme: z.string(),
  travel_period: z.object(
    {
      start_date: z.date(),
      end_date: z.date(),
    },
    {
      required_error: 'Please select a date range',
    }
  ),
  plan_budget: z.number().int(),
  scope: z.boolean(),
  number_of_members: z.number().int().nonnegative(),
  schedule: z.array(scheduleSchema),
});

export { createFormSchema };
