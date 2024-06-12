import { fetcher, MOCK_SERVER_URL } from '@/shared';

const deletePlan = (plan_id: number) => {
  fetcher(MOCK_SERVER_URL, `/plans/${plan_id}`, 'post');
};

export default deletePlan;
