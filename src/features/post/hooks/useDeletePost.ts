import { useMutation } from 'react-query';

import { useMyProfile } from '@/features/profile/hooks';
import { useAuth } from '@/lib/auth';
import { useNotificationStore } from '@/stores/notifications';

import { deletePost } from '../api';

export const useDeletePost = () => {
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
