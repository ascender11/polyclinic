import axios from 'axios';

import { env } from '../config/env';

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});
