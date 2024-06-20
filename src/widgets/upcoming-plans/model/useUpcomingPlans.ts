'use client';

import fetchUpcomingPlans from '@/widgets/upcoming-plans/api/fetchUpcomingPlans';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/shared';
import { UpcomingPlanT } from '../types/upcoming-plan-type';

const useUpcomingPlans = () => {
  const { jwt } = useAuth();
  const { data, isFetching, isLoading, isError } = useQuery<UpcomingPlanT[]>({
    queryKey: ['upcomingPlans'],
    queryFn: () => fetchUpcomingPlans(jwt as string),
  });

  return { data, isLoading, isFetching, isError };
};

export default useUpcomingPlans;
