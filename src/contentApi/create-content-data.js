import getAppsData from './get-apps-data';
import defaultConfig from '../utils/default-content-config.json';

const recommendationsCategories = ['recs', 'rhel', 'ansible', 'openshift'];

const createContentData = async () => {
  const data = await getAppsData();
  const landingPageContent = data.reduce(
    (acc, { estate, recommendations, configTryLearn }) => {
      const currentRecommendations = { ...acc.recommendations };
      recommendationsCategories.forEach((category) => {
        currentRecommendations[category] = {
          ...acc.recommendations[category],
          items: [
            ...acc.recommendations[category].items,
            ...(recommendations[category] || []),
          ],
        };
      });
      return {
        estate: [...acc.estate, ...estate],
        recommendations: currentRecommendations,
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
  // TODO: add recs for 26.4. to default-content-config.json
  landingPageContent.recommendations = [
    { ...landingPageContent.recommendations.recs },
    { ...landingPageContent.recommendations.ansible },
    { ...landingPageContent.recommendations.openshift },
    { ...landingPageContent.recommendations.rhel },
  ];
  return landingPageContent;
};

export default createContentData;
