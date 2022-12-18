import { useQuery } from 'react-query';

import { ExtractFnReturnType } from '@/lib/react-query';

import { fetchMyProfile } from '../api';

type QueryFnType = typeof fetchMyProfile;

export const useMyProfile = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['myProfile'],
    queryFn: () => fetchMyProfile(),
  });
};
