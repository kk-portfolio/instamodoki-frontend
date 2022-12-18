import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { useNotificationStore } from '@/stores/notifications';

import { updateProfile } from '../api';

import { useMyProfile } from '.';

export const useUpdateProfile = () => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch } = useMyProfile();
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'プロフィールを更新しました',
      });
      refetchUser();
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'プロフィールの更新に失敗しました',
      });
    },
    mutationFn: updateProfile,
  });
};
