import { initReactQueryAuth } from 'react-query-auth';

import { Spinner } from '@/components/Elements';
import { ROUTER_BASENAME } from '@/config';
import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  UserProfile,
} from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse(userResponse: UserResponse) {
  // const { jwt, user } = data;
  // storage.setToken(jwt);
  const { data } = userResponse;
  storage.setToken(data.token);
  return data.profile;
}

async function loadUser() {
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(`${window.location.origin}${ROUTER_BASENAME}`);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  UserProfile | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
