import { useQuery } from 'react-query';

import { ExtractFnReturnType } from '@/lib/react-query';

import { fetchMessages } from '../api';

type QueryFnType = typeof fetchMessages;

export const useMessage = (groupId: string, seen: boolean = false) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [`message_${groupId}`],
    queryFn: () => fetchMessages(groupId, seen),
    onSuccess: () => {},
    onError: () => {},
  });
};
