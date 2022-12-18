import { axios } from '@/lib/axios';

import { PostMessageResponseDTO } from '../types';

type PostMessageOptions = {
  groupId: string;
  destinationUserId: string;
  message: string;
};

export const postMessage = (params: PostMessageOptions): Promise<PostMessageResponseDTO> => {
  const dto = {
    message: params.message,
    to: params.destinationUserId,
  };
  return axios.post(`group/${params.groupId}/message`, dto);
};
