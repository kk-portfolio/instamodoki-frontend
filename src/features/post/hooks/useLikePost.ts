import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { useNotificationStore } from '@/stores/notifications';

import { likePost } from '../api';

import { usePost } from './usePost';

export const useLikePost = (id: string) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch } = usePost(id);
  return useMutation({
    onSuccess: () => {
      refetchUser();
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: '投稿のLike設定または解除に失敗しました',
      });
    },
    mutationFn: likePost,
  });
};
