import { ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from 'react-query';
import { fetchPost } from '../api';

type QueryFnType = typeof fetchPost;

export const usePost = (id: string) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [`post_${id}`],
    queryFn: () => fetchPost(id),
    onSuccess: () => {},
    onError: () => {},
  });
};
