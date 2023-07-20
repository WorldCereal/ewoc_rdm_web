import axios, { AxiosAdapter } from 'axios';
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer,
} from 'axios-extensions';
import { ApiBaseUrl } from '../config';

const http = axios.create({
  baseURL: ApiBaseUrl,
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(
    cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
    { threshold: 2 * 1000 }
  ),
});

http.defaults.timeout = 120000; // 120 sec request timeout
http.defaults.retryTimes = 2; // retry min once

http.interceptors.request.use(function (config) {
  config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  config.withCredentials = true;
  return config;
});

export default http;
