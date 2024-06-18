import { z } from 'zod';
import { add, format } from 'date-fns';
import { planEditorFormPlanSchema } from '../schema/plan-editor-schema';
import { PostNewPlanT } from '../types/plan-editor-type';

const createNewPlanData = (
  values: z.infer<typeof planEditorFormPlanSchema>
): PostNewPlanT => {
  const data: PostNewPlanT = {
    plan_name: values.plan_name,
    theme: values.theme,
    start_date: format(values.start_date, 'yyyy-MM-dd'),
    end_date: format(values.end_date, 'yyyy-MM-dd'),
    scope: values.scope,
    number_of_members: values.number_of_members,
    schedules: values.schedules.map((schedule) => ({
      schedule_date: format(
        add(new Date(values.start_date), {
          days: schedule.schedule_day,
        }),
        'yyyy-MM-dd'
      ),
      region: schedule.place_addr.split(' ')[1],
      place_category: schedule.place_category,
      place_name: schedule.place_name,
      place_addr: schedule.place_addr,
      place_memo: schedule.place_memo,
      arrival_time: schedule.arrival_time,
      x: schedule.x,
      y: schedule.y,
      budgets: [...schedule.budgets],
    })),
  };
  return data;
};
export default createNewPlanData;
