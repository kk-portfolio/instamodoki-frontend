import { useQuery } from 'react-query';

import { ExtractFnReturnType } from '@/lib/react-query';

import { fetchFollowLikeNotification } from '../api';

type QueryFnType = typeof fetchFollowLikeNotification;

export const useFollowLikeNotification = (seen: boolean = false) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['followLikeNotification'],
    queryFn: () => fetchFollowLikeNotification(seen),
  });
};
