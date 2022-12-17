import { axios } from '@/lib/axios';
import { CreateGroupRequestDTO, CreateGroupResponseDTO } from '../types';

export const createGroup = (dto: CreateGroupRequestDTO): Promise<CreateGroupResponseDTO> => {
  return axios.post(`group/`, dto);
};
