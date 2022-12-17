import { useMutation } from 'react-query';
import { useNotificationStore } from '@/stores/notifications';
import { createGroup } from '../api';
import { useGroup } from './useGroup';

export const useCreateGroup = () => {
  const { addNotification } = useNotificationStore();
  const { refetch } = useGroup();
  return useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'チャットグループの作成に失敗しました',
      });
    },
    mutationFn: createGroup,
  });
};
