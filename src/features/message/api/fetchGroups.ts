import { axios } from '@/lib/axios';

import { GroupResponseDTO } from '../types';

export const fetchGroups = (): Promise<GroupResponseDTO> => {
  return axios.get('group/');
};
