import { axios } from '@/lib/axios';

import { UpdateProfileDTO } from '../types';

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.put(`/profile`, data);
};
