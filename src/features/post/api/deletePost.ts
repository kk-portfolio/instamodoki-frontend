import { axios } from '@/lib/axios';

type deletePostOptions = {
  id: string;
};

export const deletePost = ({ id }: deletePostOptions) => {
  return axios.delete(`/post/${id}`);
};
