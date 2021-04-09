import getAppsData from './get-apps-data';
import defaultConfig from '../utils/default-content-config.json';

const recommendationsCategories = ['recs', 'rhel', 'ansible', 'openshift'];

const createContentData = async () => {
  const data = await getAppsData();
  const landingPageContent = data.reduce(
    (acc, { firstPanel, secondPanel, configTryLearn }) => {
      const recommendations = { ...acc.recommendations };
      recommendationsCategories.forEach((category) => {
        recommendations[category] = {
          ...acc.recommendations[category],
          items: [
            ...acc.recommendations[category].items,
            ...(secondPanel[category] || []),
          ],
        };
      });
      return {
        estate: [...acc.estate, ...firstPanel],
        recommendations,
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
    defaultConfig
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
