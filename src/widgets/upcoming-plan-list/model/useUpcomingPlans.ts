'use client';

import { UpcomingPlanT } from '@/widgets/upcoming-plan-list/types/upcomingplan';
import fetchUpcomingPlans from '@/widgets/upcoming-plan-list/api/fetchUpcomingPlans';
import { useQuery } from '@tanstack/react-query';

const useUpcomingPlans = () => {
  const { data, isFetching, isLoading } = useQuery<UpcomingPlanT[]>({
    queryKey: ['upcomingPlans'],
    queryFn: fetchUpcomingPlans,
  });

  return { data, isLoading, isFetching };
};

export default useUpcomingPlans;
