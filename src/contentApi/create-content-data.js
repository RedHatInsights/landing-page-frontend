import getAppsData from './get-apps-data';

const createContentData = async () => {
  const data = await getAppsData();
  const landingPageContent = data.reduce(
    (acc, { firstPanel, secondPanel, configTryLearn }) => {
      const {
        recs = [],
        rhel = [],
        ansible = [],
        openshift = [],
      } = secondPanel;
      return {
        estate: [...acc.estate, ...firstPanel],
        recommendations: {
          recs: {
            ...acc.recommendations.recs,
            items: [...acc.recommendations.recs.items, ...recs],
          },
          rhel: {
            ...acc.recommendations.rhel,
            items: [...acc.recommendations.rhel.items, ...rhel],
          },
          ansible: {
            ...acc.recommendations.ansible,
            items: [...acc.recommendations.ansible.items, ...ansible],
          },
          openshift: {
            ...acc.recommendations.openshift,
            items: [...acc.recommendations.openshift.items, ...openshift],
          },
        },
        configTryLearn: [
          {
            ...acc.configTryLearn[0],
            items: [
              ...acc.configTryLearn[0].items,
              ...configTryLearn.configure,
            ],
          },
          {
            ...acc.configTryLearn[1],
            items: [...acc.configTryLearn[1].items, ...configTryLearn.try],
          },
          {
            ...acc.configTryLearn[2],
            items: [...acc.configTryLearn[2].items, ...configTryLearn.learn],
          },
        ],
      };
    },
    {
      estate: [],
      recommendations: {
        recs: {
          title: 'Recommendations',
          id: 'recommendations',
          items: [],
        },
        rhel: {
          title: 'Insights for RHEL',
          id: 'rhel',
          items: [],
        },
        ansible: {
          title: 'Insights for Ansible',
          id: 'ansible',
          items: [],
        },
        openshift: {
          title: 'Insights for OpenShift',
          id: 'openshift',
          items: [],
        },
      },
      configTryLearn: [
        {
          id: 'configure',
          title: 'Configure',
          items: [],
        },
        {
          id: 'try',
          title: 'Try',
          items: [],
        },
        {
          id: 'learn',
          title: 'Learn',
          items: [],
        },
      ],
    }
  );
  landingPageContent.recommendations = [
    { ...landingPageContent.recommendations.recs },
    { ...landingPageContent.recommendations.openshift },
    { ...landingPageContent.recommendations.rhel },
    { ...landingPageContent.recommendations.ansible },
  ];
  return landingPageContent;
};

export default createContentData;
