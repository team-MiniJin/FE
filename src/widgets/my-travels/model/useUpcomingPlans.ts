'use client';

import { useEffect, useState } from 'react';
import fetchUpcomingPlans from '@/widgets/my-travels/api/fetchUpcomingPlans';
import { UpcomingPlanT } from '@/widgets/my-travels/types/plan';

const useUpcomingPlans = () => {
  const [data, setData] = useState<UpcomingPlanT[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchUpcomingPlans();
        if (result.success === false) {
          setError(result.message || 'Error fetching data');
        } else {
          setData(result);
        }
      } catch (err) {
        setError('Network error');
      }
    }

    fetchData();
  }, []);

  return { data, error };
};

export default useUpcomingPlans;
