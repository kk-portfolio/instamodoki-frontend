import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { MutationConfig } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { useProfile } from '.';
import { updateProfile } from '../api';

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch } = useProfile({});
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
    ...config,
    mutationFn: updateProfile,
  });
};
