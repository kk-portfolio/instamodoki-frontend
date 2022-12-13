import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { useQuery } from 'react-query';
import { fetchProfile } from '../api';

type QueryFnType = typeof fetchProfile;

type UseProfileOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useProfile = ({ config }: UseProfileOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(),
    ...config,
  });
};
