import { UserProfile } from '@/features/auth';

export type SearchUserResponseDTO = {
  status: string;
  data: number;
  users: UserProfile[];
};
