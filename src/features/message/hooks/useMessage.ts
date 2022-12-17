import { ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from 'react-query';
import { fetchMessages } from '../api';

type QueryFnType = typeof fetchMessages;

export const useMessage = (groupId: string) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [`message_${groupId}`],
    queryFn: () => fetchMessages(groupId),
    onSuccess: () => {},
    onError: () => {},
  });
};
