import { axios } from '@/lib/axios';
import { MeDTO } from '../types';

export const fetchProfile = (): Promise<MeDTO> => {
  return axios.get('users/me');
};
