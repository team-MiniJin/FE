'use client';

import { useQuery } from '@tanstack/react-query';
import getMyBookmarks from '../api/getMyBookmarks';

const useMyBookmarks = (userId: number) => {
  return useQuery({
    queryKey: ['myBookmarks'],
    queryFn: () => getMyBookmarks(userId),
  });
};

export default useMyBookmarks;
