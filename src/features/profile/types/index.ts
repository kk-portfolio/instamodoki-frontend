import { UserProfile } from '@/features/auth';

export type MyProfileDTO = {
  profile: UserProfile;
};

export type OtherProfileDTO = {
  status: string;
  data: MyProfileDTO;
};

export type UpdateProfileDTO = {
  data: {
    username: string;
    bio: string;
    website: string;
  };
};

export type FollowUnfollowUserDTO = {
  id: string;
  name: string;
};
