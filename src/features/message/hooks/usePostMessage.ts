import { useMutation } from 'react-query';

import { useNotificationStore } from '@/stores/notifications';

import { postMessage } from '../api';

import { useMessage } from './useMessage';

export const usePostMessage = (groupId: string) => {
  const { addNotification } = useNotificationStore();
  const { refetch } = useMessage(groupId);
  return useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      addNotification({
        type: 'error',
        title: 'メッセージの送信に失敗しました',
      });
    },
    mutationFn: postMessage,
  });
};
