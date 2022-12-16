import { axios } from '@/lib/axios';
import { SearchUserResponseDTO } from '../types';

export const searchUser = (text: string): Promise<SearchUserResponseDTO> => {
  return axios
    .get(`profile/search/?find=${text}`)
    .then((res) => {
      return res as unknown as SearchUserResponseDTO;
    })
    .catch(() => {
      return {} as SearchUserResponseDTO;
    });
};
