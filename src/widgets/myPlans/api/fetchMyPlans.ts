import {
  FetchMyPlanErrorT,
  FetchMyPlanSuccessT,
} from '@/widgets/myPlans/types/myPlans';

const fetchMyPlans = async (
  pageParam: number
): Promise<FetchMyPlanSuccessT | FetchMyPlanErrorT> => {
  try {
    const res = await fetch(`/api/plans?cursor=${pageParam}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

export default fetchMyPlans;
