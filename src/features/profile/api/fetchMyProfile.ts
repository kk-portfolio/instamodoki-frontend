import { axios } from '@/lib/axios';
import { MyProfileDTO } from '../types';

export const fetchMyProfile = (): Promise<MyProfileDTO> => {
  return axios.get('users/me');
};
