import { ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from 'react-query';
import { searchUser } from '../api';

type QueryFnType = typeof searchUser;

export const useSearchUser = (text: string) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [`searchUser_${text}`],
    queryFn: () => searchUser(text),
    onSuccess: () => {},
    onError: () => {},
  });
};
