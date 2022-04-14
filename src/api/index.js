import restful from '@/api/libs/restful';
// require('dotenv').config();

console.log('ENV_BASE_URL', process.env.ENV_BASE_URL);

const config = {
  baseURL: 'http://localhost:8010/',
  timeout: 100000,
  useAuth: false,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const request = restful(config);
