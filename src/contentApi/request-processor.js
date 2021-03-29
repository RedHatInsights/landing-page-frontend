import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors/interceptors';
import { get } from 'lodash';

const ALLOWED_API_METHODS = ['get', 'post'];
export const processRequest = async ({
  method = 'get',
  args = [],
  url,
  accessor,
  shape,
  errorProcessor,
  responseProcessor,
  permissions,
}) => {
  if (!ALLOWED_API_METHODS.includes(method)) {
    throw `Invalid request method ${method}. Expected one of ${ALLOWED_API_METHODS}`;
  }
  const hasPermission = await permissionProcessor(permissions);
  if (!hasPermission) {
    return undefined;
  }
  try {
    let response = await instance[method](url, ...args);
    if (typeof responseProcessor === 'function') {
      response = responseProcessor(response);
    }
    return {
      ...shape,
      count: accessor ? get(response, accessor) : response,
    };
  } catch (error) {
    if (errorProcessor) {
      return errorProcessor(error, shape);
    }
    return undefined;
  }
};

export const permissionProcessor = async (permissions = []) => {
  if (permissions.length === 0) {
    return true;
  }
  const hasPermission = permissions.map(({ method, args = [] }) =>
    window.insights.chrome.visibilityFunctions[method](...args)
  );
  return (await Promise.all(hasPermission)).every((result) => result === true);
};

export default processRequest;
