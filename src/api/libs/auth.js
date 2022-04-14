import cusStorage from '@/js/utils/cusStorage';

export const getToken = (headers) => {
  const token = cusStorage.getItem('token') || '';
  const bearerToken = token ? `Bearer ${token}` : '';

  return {
    ...headers,
    Authorization: bearerToken,
  };
};
export const no = {};
