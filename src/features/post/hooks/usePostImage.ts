import { useMutation } from 'react-query';

import { useMyProfile } from '@/features/profile/hooks';
import { useAuth } from '@/lib/auth';
import { MutationConfig } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { postImage } from '../api/postImage';

type usePostImageOptions = {
  config?: MutationConfig<typeof postImage>;
};

export const usePostImage = ({ config }: usePostImageOptions = {}) => {
  const { refetchUser } = useAuth();
  const { addNotification } = useNotificationStore();
  const { refetch } = useMyProfile();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: '写真を投稿しました',
      });
      refetchUser();
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: '写真の投稿に失敗しました',
      });
    },
    ...config,
    mutationFn: postImage,
  });
};
