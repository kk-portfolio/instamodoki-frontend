import { AuthUserProfile } from '@/features/auth';

export type MeDTO = {
  profile: AuthUserProfile;
};

export type UpdateProfileDTO = {
  data: {
    username: string;
    bio: string;
    website: string;
  };
};
