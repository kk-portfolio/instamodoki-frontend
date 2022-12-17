import { ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from 'react-query';
import { fetchMessageNotification } from '../api';

type QueryFnType = typeof fetchMessageNotification;

export const useMessageNotification = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['messageNotification'],
    queryFn: () => fetchMessageNotification(),
  });
};
