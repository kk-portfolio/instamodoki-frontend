import { axios } from '@/lib/axios';
import { resolve } from 'path';
import { FetchMessageResponseDTO } from '../types';

export const fetchMessages = (id: string): Promise<FetchMessageResponseDTO> => {
  if (id.length === 0) {
    return new Promise<FetchMessageResponseDTO>(() => {
      return {} as FetchMessageResponseDTO;
    });
  }

  return axios
    .get(`group/${id}/message`)
    .then((res) => {
      return res as unknown as FetchMessageResponseDTO;
    })
    .catch(() => {
      return {} as FetchMessageResponseDTO;
    });
};
