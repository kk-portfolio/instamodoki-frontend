import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { useNotificationStore } from '@/stores/notifications';

import { followUnfollowUser } from '../api';

import { useMyProfile, useUserProfile } from '.';

export const useFollowUnfollowUser = (name: string) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch: refetchMyProfile } = useMyProfile();
  const { refetch: refetchUserProfile } = useUserProfile(name);
  return useMutation({
    onSuccess: () => {
      refetchUser();
      refetchMyProfile();
      refetchUserProfile();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'フォローまたはフォロー解除に失敗しました',
      });
    },
    mutationFn: followUnfollowUser,
  });
};
