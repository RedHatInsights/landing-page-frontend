import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors';

// OCP | AWS | Azure | GCP
const costRequest = (type) =>
  instance
    .get(`/api/cost-management/v1/sources/?source_type=${type}`)
    .then((data) => data?.meta?.count || false)
    .catch(() => false);

export default costRequest;

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

export const createCostSchema = async () => {
  const params = ['OCP', 'AWS', 'Azure', 'GCP'];
  const linkParams = ['openshift', 'amazon', 'azure', 'google'];
  const [OCP, AWS, Azure, GCP] = await Promise.all(
    params.map((param) => costRequest(param))
  );
  const costAppId = await getCostAppId();
  const [openshiftLink, amazonLink, azureLink, googleLink] = await Promise.all(
    linkParams.map((param) => createCostSourcesLink(param, costAppId))
  );
  const firstPanelItems = [
    {
      // permissions: entitlements && cost.openshift.permissions
      section: 'Cost Management',
      title: 'OpenShift Sources',
      count: OCP,
      href: openshiftLink,
    },
    {
      // permissions: entitlements && cost.aws.permissions
      title: 'Amazon Web Services Sources',
      count: AWS,
      href: amazonLink,
    },
    {
      // permissions: entitlements && cost.azure.permissions
      title: 'Microsoft Azure Sources',
      count: Azure,
      href: azureLink,
    },
    {
      // permissions: entitlements && cost.gcp.permissions
      title: 'Google Cloud Platform Sources',
      count: GCP,
      href: googleLink,
    },
  ].filter(({ count }) => count !== false);
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
