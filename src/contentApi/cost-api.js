import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import processRequest from './request-processor';

const createCostEstateRequests = ({
  openshiftLink,
  amazonLink,
  azureLink,
  googleLink,
}) => [
  {
    // permissions: entitlements && cost.openshift.permissions
    url: '/api/cost-management/v1/sources/?source_type=OCP',
    accessor: 'meta.count',
    shape: {
      title: 'OpenShift Sources',
      href: openshiftLink,
    },
  },
  {
    // permissions: entitlements && cost.aws.permissions
    url: '/api/cost-management/v1/sources/?source_type=AWS',
    accessor: 'meta.count',
    shape: {
      title: 'Amazon Web Services Sources',
      href: amazonLink,
    },
  },
  {
    // permissions: entitlements && cost.azure.permissions
    url: '/api/cost-management/v1/sources/?source_type=Azure',
    accessor: 'meta.count',
    shape: {
      title: 'Microsoft Azure Sources',
      href: azureLink,
    },
  },
  {
    // permissions: entitlements && cost.gcp.permissions
    url: '/api/cost-management/v1/sources/?source_type=GCP',
    accessor: 'meta.count',
    shape: {
      title: 'Google Cloud Platform Sources',
      href: googleLink,
    },
  },
];

const sourcesURL = `${
  window.insights.chrome.isBeta() === true ? '/beta/' : '/'
}settings/sources`;

const installCostOperator =
  'https://access.redhat.com/documentation/en-us/cost_management_service/2021/html/getting_started_with_cost_management/index';

const offlineSource =
  'https://drive.google.com/file/d/1Ju4aMSvR2Z_etImZ1K9eLYayfSSoUKaQ/view?usp=sharing';

const costManagementApiMedium =
  'https://medium.com/@chargio/using-cost-management-through-the-api-with-a-token-1d0f4c3d349a';

export const getSourceTypesIDs = () =>
  instance
    .get('/api/sources/v3.1/source_types')
    .then(({ data }) =>
      data.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.id }), {})
    );

export const getCostAppId = () =>
  instance
    .get('/api/sources/v3.1/application_types')
    .then(
      ({ data }) =>
        data.find(({ name }) => name === '/insights/platform/cost-management')
          ?.id
    );

const createCostSourcesLink = (type, costAppId) =>
  `${sourcesURL}?filter[source_type_id][]=${
    getSourceTypesIDs()[type]
  }&filter[applications][application_type_id][eq][]=${costAppId}`;

export const getCostDataSchema = async () => {
  const linkParams = ['openshift', 'amazon', 'azure', 'google'];
  const costAppId = await getCostAppId();
  const [openshiftLink, amazonLink, azureLink, googleLink] = await Promise.all(
    linkParams.map((param) => createCostSourcesLink(param, costAppId))
  );
  const costRequests = createCostEstateRequests({
    openshiftLink,
    amazonLink,
    azureLink,
    googleLink,
  });
  const firstPanelItems = (
    await Promise.all(costRequests.map(processRequest))
  ).filter(({ count } = { count: 0 }) => count > 0);
  if (firstPanelItems.length > 0) {
    /**Add section title to first item */
    firstPanelItems[0].section = 'Cost Management';
  }

  return {
    firstPanel: firstPanelItems,
    secondPanel: [
      {
        title: 'Cost management recommendations',
        id: 'cost-recommendations',
        sections: [
          {
            title: 'Cost management recommendations',
            groups: [
              {
                // permissions: entitlements for openshift && costRequest('OCP') === 0,
                //icon: 'automation',
                id: 'cost-ocp',
                title: 'Gain Business Insights for your OpenShift Clusters',
                description:
                  'Install the Cost Operator on your OpenShift cluster to get started',
                action: {
                  title: 'Learn more',
                  href: installCostOperator,
                },
              },
            ],
          },
        ],
      },
    ],
    configTryLearn: {
      configure: [
        {
          // icon: 'connected',
          // permissions: (entitlements && org admin) || cost permissions
          title: 'Add public cloud sources to better track your finances',
          description: 'Modify user access to applications.',
          link: {
            title: 'Connect',
            href: sourcesURL,
          },
        },
      ],
      try: [
        {
          // icon: 'builderImage',
          // permissions: (entitlements && org admin) || cost permissions
          title: 'Cost Management now has forecasting',
          description:
            'We can predict your spend on both OpenShift and public cloud costs.',
          link: {
            title: 'Get started',
            href: '/cost-management',
          },
        },
        {
          // icon: 'builderImage',
          // permissions: (entitlements && org admin) || cost permissions
          title: 'Cost Management supports Google Cloud Platform',
          description:
            'We can track your OpenShift cluster running on Google Cloud Platform spend.',
          link: {
            title: 'Get started',
            href: `${sourcesURL}/new`,
          },
        },
      ],
      learn: [
        {
          // icon: 'cloudSecurity',
          title:
            'Adding a source to cost management when it is not connected to the Internet',
          link: {
            title: 'Watch',
            href: offlineSource,
          },
        },
        {
          // icon: 'cloudSecurity',
          title: 'How to use the Cost Management API',
          link: {
            title: 'Read',
            href: costManagementApiMedium,
          },
        },
      ],
    },
  };
};
