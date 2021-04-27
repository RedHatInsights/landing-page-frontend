import get from 'lodash/get';
import Cookies from 'js-cookie';

import {
  hasPermissions as hasPermissionsEnhanced,
  loosePermissions as loosePermissionsEnhanced,
} from '../utils/allPermissions';
import conditionProcessor from './condition-processor';

const enhancedFunctions = {
  ...window.insights.chrome.visibilityFunctions,
  hasPermissions: hasPermissionsEnhanced,
  loosePermissions: loosePermissionsEnhanced,
  isNotEntitled: async (...args) => {
    const isEntitled = await window.insights.chrome.visibilityFunctions.isEntitled(
      ...args
    );
    return !isEntitled;
  },
};

const ALLOWED_API_METHODS = ['get', 'post'];

// the Authorization header is needed for api.openshift, 3scale will set this for all CRC hosted APIs, but not openshift :(
const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${Cookies.get('cs_jwt')}`,
  'Content-Type': 'application/json',
};

export const processRequest = async ({
  method = 'get',
  args = [],
  url,
  accessor,
  shape,
  errorProcessor,
  responseProcessor,
  permissions,
  condition,
}) => {
  if (!ALLOWED_API_METHODS.includes(method)) {
    throw `Invalid request method ${method}. Expected one of ${ALLOWED_API_METHODS}`;
  }
  try {
    const hasPermission = await permissionProcessor(permissions);
    if (!hasPermission) {
      throw 'User does not have permissions';
    }
    let response;
    if (url) {
      /**
       * FEC interceptors were logging out users if the API returned 401 response.
       * That is not required behavior in this case. IF we get 401 we just hide the data.
       */
      response = await fetch(url, {
        method,
        headers,
        data: JSON.stringify(args[0]),
      }).then((d) => d.json());
    }
    if (typeof responseProcessor === 'function') {
      response = await responseProcessor(response);
    }
    return {
      ...shape,
      response,
      count: accessor ? get(response, accessor) : response,
      show: condition ? conditionProcessor(response, condition) : true,
    };
  } catch (error) {
    if (errorProcessor) {
      return errorProcessor(error, shape);
    }
    throw error;
  }
};

export const permissionProcessor = async (permissions = []) => {
  if (permissions.length === 0) {
    return true;
  }
  const hasPermission = permissions.map(({ method, args = [] }) =>
    enhancedFunctions[method](...args)
  );
  return (await Promise.all(hasPermission)).every((result) => result === true);
};

export default processRequest;
