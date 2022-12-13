import { STORAGE_PREFIX } from '@/config';

const storage = {
  getValue: (key: string) => {
    return JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}_${key}`) as string);
  },
  setValue: (key: string, value: string) => {
    window.localStorage.setItem(`${STORAGE_PREFIX}_${key}`, JSON.stringify(value));
  },
  clearValue: (key: string) => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}_${key}`);
  },
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}_token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${STORAGE_PREFIX}_token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}_token`);
  },
};

export default storage;
