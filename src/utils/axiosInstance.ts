import axios from 'axios';
import {
  authInterceptor,
  errorInterceptor,
  interceptor500,
  responseDataInterceptor,
} from '@redhat-cloud-services/frontend-components-utilities/interceptors';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.response.use(responseDataInterceptor);
axiosInstance.interceptors.request.use(async (config) => {
  // eslint-disable-next-line rulesdir/no-chrome-api-call-from-window
  const token = await window.insights.chrome.auth.getToken();
  const updatedCfg = { ...config };
  if (token) {
    updatedCfg.headers = {
      ...updatedCfg.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return updatedCfg;
});

axiosInstance.interceptors.response.use(undefined, interceptor500);
axiosInstance.interceptors.response.use(undefined, errorInterceptor);

export default axiosInstance;
