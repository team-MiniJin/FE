'use client';

import fetchUpcomingPlans from '@/widgets/upcoming-plans/api/fetchUpcomingPlans';
import { useQuery } from '@tanstack/react-query';
import { UpcomingPlanT } from '../types/upcoming-plan-type';

const useUpcomingPlans = () => {
  const { data, isFetching, isLoading, isError } = useQuery<UpcomingPlanT[]>({
    queryKey: ['upcomingPlans'],
    queryFn: fetchUpcomingPlans,
  });

  return { data, isLoading, isFetching, isError };
};

export default useUpcomingPlans;
