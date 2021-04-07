import { getAnsibleDataSchema } from './ansible-api';
import { getCloudAccessDataSchema } from './cloud-access-api';
import { getCostDataSchema } from './cost-api';
import { createRhelSchema } from './rhel';

const getAppsData = () => {
  const data = [
    getCloudAccessDataSchema(),
    createRhelSchema(),
    getAnsibleDataSchema(),
    getCostDataSchema(),
  ];
  return data;
};

export default getAppsData;
