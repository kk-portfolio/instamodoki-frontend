import { axios } from '@/lib/axios';
import { FollowLikeNotificationResponseDTO } from '../types';

export const fetchFollowLikeNotification = (
  seen: boolean = false
): Promise<FollowLikeNotificationResponseDTO> => {
  const url = seen ? 'profile/notifications-seen' : 'profile/notifications';
  return axios.get(url);
};
