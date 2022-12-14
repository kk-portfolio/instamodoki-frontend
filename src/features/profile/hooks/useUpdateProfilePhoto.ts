import { useMutation } from 'react-query';

import { useAuth } from '@/lib/auth';
import { MutationConfig } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { useProfile } from '.';
import { updateProfilePhoto } from '../api';

type UseUpdateProfilePhotoOptions = {
  config?: MutationConfig<typeof updateProfilePhoto>;
};

export const useUpdateProfilePhoto = ({ config }: UseUpdateProfilePhotoOptions = {}) => {
  const { addNotification } = useNotificationStore();
  const { refetchUser } = useAuth();
  const { refetch } = useProfile({});
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
    ...config,
    mutationFn: updateProfilePhoto,
  });
};
