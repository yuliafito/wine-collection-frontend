const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY);
};

export const isAuthenticated = () => {
  return Boolean(getAccessToken());
};

export const logout = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};
