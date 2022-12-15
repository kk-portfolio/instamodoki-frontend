import { axios } from '@/lib/axios';
import { PostImageDTO } from '../types';

export const postImage = ({ image, caption }: PostImageDTO) => {
  const data = new FormData();
  data.append('image', image, 'image.png');
  data.append('caption', caption);

  return axios.post(`/post`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};
