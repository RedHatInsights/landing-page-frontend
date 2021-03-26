import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors/interceptors';
import { get } from 'lodash';

const ALLOWED_API_METHODS = ['get', 'post'];
const processRequest = async ({
  method = 'get',
  args = [],
  url,
  accessor,
  shape,
  errorProcessor,
}) => {
  if (!ALLOWED_API_METHODS.includes(method)) {
    throw `Invalid request method ${method}. Expected one of ${ALLOWED_API_METHODS}`;
  }
  try {
    const response = await instance[method](url, ...args);
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

export default processRequest;
