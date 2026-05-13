import { getAccessToken, getRefreshToken, saveTokens, logout } from '../utils/auth';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  const res = await fetch(`${API_URL}/user/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) throw new Error('Refresh failed');

  const data = await res.json();
  saveTokens(data.access, refresh);
  return data.access;
};

export const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = getAccessToken();

  const doFetch = (access?: string) =>
    fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(access && !endpoint.includes('/token') ? { Authorization: `Bearer ${access}` } : {}),
        ...options.headers,
      },
    });

  let res = await doFetch(token ?? undefined);

  if (res.status !== 401) {
    if (!res.ok) throw await res.json();
    return (await res.json()) as T;
  }

  try {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken();
    }

    const newAccess = await refreshPromise!;
    isRefreshing = false;
    refreshPromise = null;

    res = await doFetch(newAccess);

    if (!res.ok) throw await res.json();
    return (await res.json()) as T;
  } catch {
    logout();
    window.location.href = '/auth';
    throw new Error('Unauthorized');
  }
};
