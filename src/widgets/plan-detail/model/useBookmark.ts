import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/shared';
import deleteBookmark from '../api/deleteBookmark';
import postBookmark from '../api/postBookmark';

interface BookmarkVariables {
  isDelete: boolean;
  planId: number;
}

const useBookmark = () => {
  const { jwt } = useAuth();

  return useMutation({
    mutationFn: ({ isDelete, planId }: BookmarkVariables) =>
      isDelete
        ? deleteBookmark(planId, jwt as string)
        : postBookmark(planId, jwt as string),
    onSuccess: (data) => {
      // 성공 시 실행할 코드
      console.log('Bookmark operation successful:', data);
    },
    onError: (error) => {
      // 오류 시 실행할 코드
      console.error('Bookmark operation failed:', error);
    },
    onSettled: () => {
      // 성공 여부에 상관없이 실행할 코드
      console.log('Bookmark operation completed.');
    },
  });
};

export default useBookmark;
