import { axios } from '@/lib/axios';

import { PostImageRequestDTO } from '../types';

export const postImage = ({ image, caption }: PostImageRequestDTO) => {
  const data = new FormData();
  data.append('image', image, 'image.png');
  data.append('caption', caption);

  return axios.post(`/post`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};
