import { axios } from '@/lib/axios';

export const updateProfilePhoto = (blob: Blob) => {
  const data = new FormData();
  data.append('image', blob, 'image.png');
  return axios.put(`/profile/profile-photo`, data, {
    headers: { 'content-type': 'multipart/form-data' },
  });
};
