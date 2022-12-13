import { axios } from '@/lib/axios';

import { AuthData, AuthUserProfile } from '../types';

export const getUser = (): Promise<AuthUserProfile> => {
  const response = axios.get('/users/me').then((res) => {
    const authData: AuthData = res as unknown as AuthData;
    return authData?.profile;
  });
  return response;
};
