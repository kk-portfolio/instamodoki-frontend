import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { useNotificationStore } from '@/stores/notifications';
import { useMyProfile } from '.';
import { updateProfilePhoto } from '../api';

export const useUpdateProfilePhoto = () => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch } = useMyProfile();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'プロフィール写真を更新しました',
      });
      refetchUser();
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'プロフィール写真の更新に失敗しました',
      });
    },
    mutationFn: updateProfilePhoto,
  });
};
