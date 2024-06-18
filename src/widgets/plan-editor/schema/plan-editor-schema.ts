import { differenceInDays } from 'date-fns';
import { z } from 'zod';

const planEditorFormBudgetSchema = z.object({
  budget_category: z.string().min(1, '지출 내용을 입력해 주세요.'),
  cost: z.string(),
});

const planEditorFormScheduleSchema = z.object({
  place_category: z
    .string()
    .min(1, '장소 유형을 입력해 주세요.')
    .max(30, '30자 이내로 입력해 주세요.'),
  place_name: z
    .string()
    .min(1, '검색을 통해 장소 이름을 넣어주세요.')
    .max(40, '40자 이내로 입력해 주세요.'),
  place_addr: z.string().min(1, '검색을 통해 주소를 넣어주세요.'),
  arrival_time: z
    .string()
    .min(3, '도착 시간을 입력해 주세요.')
    .regex(/^\d{2}:\d{2}$/, '입력 형식에 맞게 입력해 주세요. (예: 08:10)'),
  budgets: z.array(planEditorFormBudgetSchema),
  x: z.number(), // 비공개
  y: z.number(), // 비공개
  place_memo: z.string(),
  schedule_day: z.number(), // 비공개
});

const planEditorFormPlanSchema = z
  .object({
    plan_name: z.string().min(1, '일정 이름을 입력해 주세요.'),
    theme: z.string().min(1, '일정 테마를 선택해 주세요.'),
    start_date: z.date(),
    end_date: z.date(),
    scope: z.boolean(),
    number_of_members: z.number().int().nonnegative(),
    schedules: z.array(planEditorFormScheduleSchema),
  })
  .superRefine((data, ctx) => {
    if (differenceInDays(data.end_date, data.start_date) > 60) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '최대 60일까지의 일정을 생성할 수 있습니다.',
        path: ['end_date'],
      });
    }
  });

export { planEditorFormPlanSchema };
