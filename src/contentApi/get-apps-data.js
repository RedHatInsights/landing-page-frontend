import { getAnsibleDataSchema } from './ansible-api';
import { getCloudAccessDataSchema } from './cloud-access-api';
import { getCostDataSchema } from './cost-api';
import { getFifiDataSchema } from './fifi-api';
import { createRhelSchema } from './rhel';

const getAppsData = () => {
  const data = [
    createRhelSchema(),
    getAnsibleDataSchema(),
    getCloudAccessDataSchema(),
    getFifiDataSchema(),
    getCostDataSchema(),
  ];
  return data;
};

export default getAppsData;
