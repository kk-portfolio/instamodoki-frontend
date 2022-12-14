import { useQuery } from 'react-query';

import { ExtractFnReturnType } from '@/lib/react-query';

import { fetchUserProfile } from '../api';

type QueryFnType = typeof fetchUserProfile;

export const useUserProfile = (name: string) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [`userProfile_${name}`],
    queryFn: () => fetchUserProfile(name),
    onSuccess: () => {},
    onError: () => {},
  });
};
