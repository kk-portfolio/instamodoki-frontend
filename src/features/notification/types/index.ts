import { UserProfile } from '@/features/auth';
import { Message } from '@/features/message/types';

export type MessageNotification = {
  _id: string;
  message: Message[];
};

export type MessageNotificationResponseDTO = {
  notifications: MessageNotification[];
};

export type FollowLikeNotification = {
  type: string;
  seen: boolean;
  _id: string;
  to: string;
  user: UserProfile;
  createdAt: string;
  __v: number;
};

export type FollowLikeNotificationResponseDTO = {
  notifications: FollowLikeNotification[];
};
