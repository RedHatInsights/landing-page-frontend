import { getAnsibleDataSchema } from './ansible-api';
import { getCostDataSchema } from './cost-api';
import { getFifiDataSchema } from './fifi-api';
import { getPriorityDataSchema } from './priority-api';
import { createRhelSchema } from './rhel';

import { getManagedServicesDataSchema } from './managed-services-api';

const getAppsData = () => {
  const data = [
    getPriorityDataSchema(),
    createRhelSchema(),
    getAnsibleDataSchema(),
    getFifiDataSchema(),
    getCostDataSchema(),
  ];
  if (
    window.insights.chrome.getEnvironment() === 'stage' &&
    window.insights.chrome.isBeta()
  ) {
    data.push(getManagedServicesDataSchema());
  }
  return data;
};

export default getAppsData;
