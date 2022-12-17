import { Photo, Post, UserProfile } from '@/features/auth';

export type Group = {
  users: UserProfile[];
  _id: string;
  createdBy: string;
  groupType: string;
  date: string;
  __v: number;
};

export type GroupResponseDTO = {
  status: string;
  groups: Group[];
};

export type CreateGroupRequestDTO = {
  userId: string;
};

type CreatedGroup = {
  users: UserProfile;
  _id: string;
  createdBy: string;
  groupType: string;
  date: string;
  __v: number;
};

export type CreateGroupResponseDTO = {
  status: string;
  createdGroup: CreatedGroup;
};

export type Sender = {
  photo: Photo;
  _id: string;
  user: string;
  username: string;
  name: string;
  posts: Post[];
  id: string;
};

export type Message = {
  seen: any[];
  _id: string;
  message: string;
  sender: Sender | string;
  groupId: string;
  to: string;
  createdAt: string;
  __v: number;
};

export type FetchMessageResponseDTO = {
  status: string;
  messages: Message[];
};

export type PostMessageResponseDTO = {
  status: string;
  messages: Message[];
};
