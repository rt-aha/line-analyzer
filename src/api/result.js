import { request } from '@/api';

export const resultAPI = async (payload) => {
  const res = await request({
    method: 'get',
    url: '/result',
    params: payload,
  });
  return res.data;
};
