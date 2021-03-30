import { getAnsibleDataSchema } from './ansible-api';
import { getCostDataSchema } from './cost-api';
import { createRhelSchema } from './rhel';

const getAppsData = () => {
  const data = [
    createRhelSchema(),
    getAnsibleDataSchema(),
    getCostDataSchema(),
  ];
  return data;
};

export default getAppsData;
