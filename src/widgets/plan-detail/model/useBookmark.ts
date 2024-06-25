import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const { mutate: mutateBookmark } = useMutation({
    mutationFn: ({ isDelete, planId }: BookmarkVariables) =>
      isDelete
        ? deleteBookmark(planId, jwt as string)
        : postBookmark(planId, jwt as string),
    onMutate: async ({ isDelete }) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarked', planId] });
      await queryClient.cancelQueries({ queryKey: ['plan', planId] });

      const previousBookmark = queryClient.getQueryData(['bookmarked', planId]);
      const previousPlan = queryClient.getQueryData(['plan', planId]);

      queryClient.setQueryData(['bookmarked', planId], (old: any) => ({
        ...old,
        isBookmarked: !isDelete,
      }));

      queryClient.setQueryData(['plan', planId], (old: any) => ({
        ...old,
        number_of_scraps: old.number_of_scraps + (isDelete ? -1 : 1),
      }));

      return { previousBookmark, previousPlan };
    },
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData(
          ['bookmarked', planId],
          context.previousBookmark
        );
        queryClient.setQueryData(['plan', planId], context.previousPlan);
      }
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['bookmarked', planId] }),
        queryClient.invalidateQueries({ queryKey: ['plan', planId] }),
        queryClient.invalidateQueries({ queryKey: ['userTravels'] }),
      ]);
      await Promise.all([
        queryClient.refetchQueries({ queryKey: ['bookmarked', planId] }),
        queryClient.refetchQueries({ queryKey: ['plan', planId] }),
        queryClient.refetchQueries({ queryKey: ['userTravels'] }),
      ]);
    },
  });

  const { data: bookmark } = useQuery({
    queryKey: ['bookmarked', planId],
    queryFn: () => getBookmarked(planId, jwt as string),
  });

  return { mutateBookmark, bookmark };
};

export default useBookmark;
