import { getAnsibleDataSchema } from './ansible-api';
import { getCostDataSchema } from './cost-api';
import { getFifiDataSchema } from './fifi-api';
import { getPriorityDataSchema } from './priority-api';
import { createRhelSchema } from './rhel';

const getAppsData = () => {
  const data = [
    getPriorityDataSchema(),
    createRhelSchema(),
    getAnsibleDataSchema(),
    getFifiDataSchema(),
    getCostDataSchema(),
  ];
  return data;
};

export default getAppsData;
