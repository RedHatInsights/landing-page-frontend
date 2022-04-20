import axios from 'axios';
import {
  authInterceptor,
  responseDataInterceptor,
  interceptor500,
  errorInterceptor,
} from '@redhat-cloud-services/frontend-components-utilities/interceptors';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.response.use(responseDataInterceptor);
axiosInstance.interceptors.request.use(async (config) => {
  const token = await insights.chrome.auth.getToken();
  const updatedCfg = { ...config };
  if (token) {
    updatedCfg.headers = {
      ...updatedCfg.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return updatedCfg;
});

axiosInstance.interceptors.response.use(null, interceptor500);
axiosInstance.interceptors.response.use(null, errorInterceptor);

export default axiosInstance;
