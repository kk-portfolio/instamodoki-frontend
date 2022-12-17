import { axios } from '@/lib/axios';
import { MessageNotificationResponseDTO } from '../../notification/types';

export const fetchMessageNotification = (): Promise<MessageNotificationResponseDTO> => {
  return axios.get('group/notifications');
};
