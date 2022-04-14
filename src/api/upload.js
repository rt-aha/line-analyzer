import { request } from '@/api';

export const uploadAPI = async (payload) => {
  var formData = new FormData();
  formData.append('file', payload);

  const res = await request({
    method: 'post',
    url: '/upload',
    data: formData,
  });
  return res.data;
};
