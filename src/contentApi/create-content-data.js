import getAppsData from './get-apps-data';

const createContentData = async () => {
  const data = await getAppsData();
  const landingPageContent = data.reduce(
    (acc, { firstPanel, secondPanel, configTryLearn }) => ({
      estate: [...acc.estate, ...firstPanel],
      recommendations: [...acc.recommendations, ...secondPanel],
      configTryLearn: [
        {
          ...acc.configTryLearn[0],
          items: [...acc.configTryLearn[0].items, ...configTryLearn.configure],
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
    }),
    {
      estate: [],
      recommendations: [],
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
  return landingPageContent;
};

export default createContentData;
