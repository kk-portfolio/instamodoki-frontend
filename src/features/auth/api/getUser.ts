import { axios } from '@/lib/axios';

import { AuthData, UserProfile } from '../types';

export const getUser = (): Promise<UserProfile> => {
  const response = axios.get('/users/me').then((res) => {
    const authData: AuthData = res as unknown as AuthData;
    return authData?.profile;
  });
  return response;
};
