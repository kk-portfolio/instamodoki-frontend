import { axios } from '@/lib/axios';
import { FollowUnfollowUserDTO } from '../types';

type followUnfollowUserOptions = {
  data: FollowUnfollowUserDTO;
  shouldFollow: boolean;
};

export const followUnfollowUser = ({ data, shouldFollow }: followUnfollowUserOptions) => {
  const url = shouldFollow ? '/profile/follow' : '/profile/unfollow';
  return axios.post(url, data);
};
