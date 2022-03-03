import { getAnsibleDataSchema } from './ansible-api';
import { getCostDataSchema } from './cost-api';
import { getFifiDataSchema } from './fifi-api';
import { getPriorityDataSchema } from './priority-api';
import { createRhelSchema } from './rhel';

import { getManagedServicesDataSchema } from './managed-services-api';

async function getSchema(url, section) {
  let data = await axiosInstance.get(url);
  if (data?.estate?.items) {
    data.estate = [
      {
        section,
        items: data.estate.items,
      },
    ];
  }
  return data;
}

const getAppsData = async () => {
  const data = await Promise.all([
    getPriorityDataSchema(),
    getManagedServicesDataSchema(),
    createRhelSchema(),
    getAnsibleDataSchema(),
    getFifiDataSchema(),
    getCostDataSchema(),
  ]);
  return data;
};

export default getAppsData;
