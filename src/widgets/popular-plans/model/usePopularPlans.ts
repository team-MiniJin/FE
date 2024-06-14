import { useQuery } from '@tanstack/react-query';
import getPopularPlans from '../api/getPopularPlans';

const usePopularPlans = () => {
  return useQuery({ queryKey: ['popularPlans'], queryFn: getPopularPlans });
};
export default usePopularPlans;
