import { createAnsibleSchema } from './ansible-api';
import { createCostSchema } from './cost-api';
import { createRhelSchema } from './rhel';

const createContentData = async () => {
  const [cost, ansible, rhel] = await Promise.all([
    createCostSchema(),
    createAnsibleSchema(),
    createRhelSchema(),
  ]);
  console.log({ cost, ansible, rhel });
  const configTryLearn = [
    {
      id: 'configure',
      title: 'Configure',
      items: [
        ...cost.configTryLearn.configure,
        ...ansible.configTryLearn.configure,
        ...rhel.configTryLearn.configure,
      ],
    },
    {
      id: 'try',
      title: 'Try',
      items: [
        ...cost.configTryLearn.try,
        ...ansible.configTryLearn.try,
        ...rhel.configTryLearn.try,
      ],
    },
    {
      id: 'learn',
      title: 'Learn',
      items: [
        ...cost.configTryLearn.learn,
        ...ansible.configTryLearn.learn,
        ...rhel.configTryLearn.learn,
      ],
    },
  ];
  return {
    estate: [...cost.firstPanel, ...ansible.firstPanel, ...rhel.firstPanel],
    recommendations: [
      ...cost.secondPanel,
      { id: 'ansible', title: 'Ansible', sections: ansible.secondPanel },
      ...rhel.secondPanel,
    ],
    configTryLearn,
  };
};

export default createContentData;
