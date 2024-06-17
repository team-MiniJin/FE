import { fetcher, TRAVEL_URL } from '@/shared';
import { z } from 'zod';
import { planEditorFormPlanSchema } from '../schema/plan-editor-schema';

const postNewPlan = (data: z.infer<typeof planEditorFormPlanSchema>) => {
  const result = fetcher(TRAVEL_URL, '/plans', 'post', undefined, { data });
  console.log(result);
};
export default postNewPlan;
