import { axios } from '@/lib/axios';

type likePostOptions = {
  id: string;
  data?: string;
};

export const likePost = ({ id, data = 'like' }: likePostOptions) => {
  return axios.post(`/post/like/${id}`, { data: data });
};
