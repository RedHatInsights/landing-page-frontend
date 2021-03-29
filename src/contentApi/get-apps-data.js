import { getAnsibleDataSchema } from './ansible-api';
import { getCostDataSchema } from './cost-api';
import { createRhelSchema } from './rhel';

const appsDataSources = [
  createRhelSchema,
  getAnsibleDataSchema,
  getCostDataSchema,
];

const getAppsData = () => {
  const promises = [];
  appsDataSources.forEach((source) => {
    promises.push(source());
  });
  return Promise.all(promises);
};

export default getAppsData;
