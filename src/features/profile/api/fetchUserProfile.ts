import { axios } from '@/lib/axios';
import { OtherProfileDTO } from '../types';

export const fetchUserProfile = (name: string): Promise<OtherProfileDTO> => {
  return axios
    .get(`profile/${name}`)
    .then((res) => {
      return res as unknown as OtherProfileDTO;
    })
    .catch(() => {
      return {} as OtherProfileDTO;
    });
};
