import { useQuery } from 'react-query';

import { ExtractFnReturnType } from '@/lib/react-query';

import { fetchGroups } from '../api';

type QueryFnType = typeof fetchGroups;

export const useGroup = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['group'],
    queryFn: () => fetchGroups(),
  });
};
