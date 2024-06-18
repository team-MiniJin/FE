import { fetcher, TRAVEL_URL } from '@/shared';
import { PostNewPlanT } from '../types/plan-editor-type';

const planData = {
  user_id: 1,
  plan_name: '테스트 계획-1',
  theme: '테스트-1',
  start_date: '2024-05-31',
  end_date: '2024-06-03',
  scope: true,
  number_of_members: 3,
  schedules: [
    {
      schedule_date: '2024-05-31',
      place_category: '음식점-1',
      place_name: '테스트 하기-1',
      place_addr: '서울시',
      region: '서울',
      place_memo: '파싱해서 저장하자-1',
      arrival_time: '21:00:00',
      budget: [
        {
          budget_category: '식비-1',
          cost: 4000,
        },
        {
          budget_category: '식비2',
          cost: 5000,
        },
      ],
      x: -31.3,
      y: -62.3,
    },
  ],
};
const postNewPlan = async (data: PostNewPlanT) => {
  try {
    const result = await fetcher(
      TRAVEL_URL,
      '/plans',
      'post',
      { 'Content-Type': 'application/json' },
      undefined,
      planData
    );
    console.log(result);
  } catch (error) {
    console.error('Failed to post new plan:', error);
  }
};

export default postNewPlan;
