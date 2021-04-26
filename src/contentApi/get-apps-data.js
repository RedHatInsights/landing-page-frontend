import { getAnsibleDataSchema } from './ansible-api';
import { getCostDataSchema } from './cost-api';
import { getFifiDataSchema } from './fifi-api';
import { getPriorityDataSchema } from './priority-api';
import { createRhelSchema } from './rhel';

import { getManagedServicesDataSchema } from './managed-services-api';

const getAppsData = () => {
  const data = [
    getPriorityDataSchema(),
    getManagedServicesDataSchema(),
    createRhelSchema(),
    getAnsibleDataSchema(),
    getFifiDataSchema(),
    getCostDataSchema(),
  ];
  return data;
};

export default getAppsData;
