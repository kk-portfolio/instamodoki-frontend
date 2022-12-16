import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { useNotificationStore } from '@/stores/notifications';
import { deletePost } from '../api';
import { useMyProfile } from '@/features/profile/hooks';

export const useDeletePost = (id: string) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch } = useMyProfile();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: '投稿を削除しました',
      });
      refetchUser();
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: '投稿の削除に失敗しました',
      });
    },
    mutationFn: deletePost,
  });
};
