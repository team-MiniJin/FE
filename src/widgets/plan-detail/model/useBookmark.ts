import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/shared';
import deleteBookmark from '../api/deleteBookmark';
import postBookmark from '../api/postBookmark';
import getBookmarked from '../api/getBookmarked';

interface BookmarkVariables {
  isDelete: boolean;
  planId: number;
}

const useBookmark = (planId: number) => {
  const { jwt } = useAuth();

  const { mutate: mutateBookmark } = useMutation({
    mutationFn: ({ isDelete, planId }: BookmarkVariables) =>
      isDelete
        ? deleteBookmark(planId, jwt as string)
        : postBookmark(planId, jwt as string),
  });
  const { data: bookmark } = useQuery({
    queryKey: ['bookmarked', planId],
    queryFn: () => getBookmarked(planId, jwt as string),
  });
  return { mutateBookmark, bookmark };
};

export default useBookmark;
