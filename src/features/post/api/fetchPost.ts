import { axios } from '@/lib/axios';

import { PostDetailResponseDTO } from '../types';

export const fetchPost = (id: string): Promise<PostDetailResponseDTO> => {
  return axios
    .get(`post/${id}`)
    .then((res) => {
      return res as unknown as PostDetailResponseDTO;
    })
    .catch(() => {
      return {} as PostDetailResponseDTO;
    });
};
