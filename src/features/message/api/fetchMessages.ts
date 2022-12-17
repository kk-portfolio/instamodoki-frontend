import { axios } from '@/lib/axios';
import { FetchMessageResponseDTO } from '../types';

export const fetchMessages = (
  id: string,
  seen: boolean = false
): Promise<FetchMessageResponseDTO> => {
  if (id.length === 0) {
    return new Promise<FetchMessageResponseDTO>(() => {
      return {} as FetchMessageResponseDTO;
    });
  }

  const url = seen ? `group/${id}/message-seen` : `group/${id}/message`;

  return axios
    .get(url)
    .then((res) => {
      return res as unknown as FetchMessageResponseDTO;
    })
    .catch(() => {
      return {} as FetchMessageResponseDTO;
    });
};
