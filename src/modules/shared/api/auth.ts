import type { User } from '../../../types/User';
import { request } from './http';

export interface TokenPair {
  access: string;
  refresh: string;
}

export const verifyToken = (token: string) => {
  return request('/user/token/verify/', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
};

export const login = (data: { email: string; password: string }) => {
  return request<TokenPair>('/user/token/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const register = (data: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  birth_date: string;
}) => {
  return request<User>('/user/register/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getMe = () => {
  return request<User>('/user/me/');
};

export const updateMe = (data: Partial<User>) => {
  return request<User>('/user/me/', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const replaceMe = (data: {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  birth_date: string;
}) => {
  return request<User>('/user/me/', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const changePassword = (data: { old_password: string; new_password: string }) => {
  return request('/user/me/change-password/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
