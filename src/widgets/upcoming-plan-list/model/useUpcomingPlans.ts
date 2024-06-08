'use client';

import fetchUpcomingPlans from '@/widgets/upcoming-plan-list/api/fetchUpcomingPlans';
import { useQuery } from '@tanstack/react-query';
import { UpcomingPlanT } from '@/widgets/upcoming-plan-list/types/upcomingPlan';

const useUpcomingPlans = () => {
  const { data, isFetching, isLoading } = useQuery<UpcomingPlanT[]>({
    queryKey: ['upcomingPlans'],
    queryFn: fetchUpcomingPlans,
  });

  return { data, isLoading, isFetching };
};

export default useUpcomingPlans;