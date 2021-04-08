import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors';

let costAppId;
export const getCostAppId = () =>
  instance
    .get('/api/sources/v3.1/application_types')
    .then(
      ({ data }) =>
        data.find(({ name }) => name === '/insights/platform/cost-management')
          ?.id
    );

export const getSourceTypesIDs = () =>
  instance
    .get('/api/sources/v3.1/source_types')
    .then(({ data }) =>
      data.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.id }), {})
    );

const createCostSourcesLink = async (type, costAppId) => {
  const sourceTypeId = await getSourceTypesIDs()[type];
  return `${sourcesURL}?filter[source_type_id][]=${sourceTypeId}&filter[applications][application_type_id][eq][]=${costAppId}`;
};

const estateResponseProcessor = async (response) => {
  if (response?.meta?.count === 0) {
    throw 'No data, do not show';
  }
  if (!costAppId) {
    costAppId = await getCostAppId();
  }
  const href = createCostSourcesLink(response.href, costAppId);
  return {
    ...response,
    href,
  };
};

const estateRequests = [
  {
    section: 'Cost management',
    items: [
      {
        // permissions: entitlements && cost.openshift.permissions
        id: 'cost-ocp-sources',
        url: '/api/cost-management/v1/sources/?source_type=OCP',
        accessor: 'meta.count',
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'OpenShift Sources',
          href: 'openshift',
        },
      },
      {
        // permissions: entitlements && cost.aws.permissions
        id: 'cost-aws-sources',
        url: '/api/cost-management/v1/sources/?source_type=AWS',
        accessor: 'meta.count',
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'Amazon Web Services Sources',
          href: 'amazon',
        },
      },
      {
        // permissions: entitlements && cost.azure.permissions
        id: 'cost-azure-sources',
        url: '/api/cost-management/v1/sources/?source_type=Azure',
        accessor: 'meta.count',
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'Microsoft Azure Sources',
          href: 'azure',
        },
      },
      {
        // permissions: entitlements && cost.gcp.permissions
        id: 'cost-gcp-sources',
        url: '/api/cost-management/v1/sources/?source_type=GCP',
        accessor: 'meta.count',
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'Google Cloud Platform Sources',
          href: 'google',
        },
      },
    ],
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

export const getCostDataSchema = () => {
  return {
    firstPanel: estateRequests,
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
          shape: {
            title: 'Add public cloud sources to better track your finances',
            description: 'Modify user access to applications.',
            link: {
              title: 'Connect',
              href: sourcesURL,
            },
          },
          permissions: [
            {
              method: 'isEntitled',
              args: ['cost_management'],
            },
          ],
        },
      ],
      try: [
        {
          // icon: 'builderImage',
          shape: {
            title: 'Cost Management now has forecasting',
            description:
              'We can predict your spend on both OpenShift and public cloud costs.',
            link: {
              title: 'Get started',
              href: '/cost-management',
            },
          },
          permissions: [
            {
              method: 'isEntitled',
              args: ['cost_management'],
            },
          ],
        },
        {
          // icon: 'builderImage',
          shape: {
            title: 'Cost Management supports Google Cloud Platform',
            description:
              'We can track your OpenShift cluster running on Google Cloud Platform spend.',
            link: {
              title: 'Get started',
              href: `${sourcesURL}/new`,
            },
          },
          permissions: [
            {
              method: 'isEntitled',
              args: ['cost_management'],
            },
          ],
        },
      ],
      learn: [
        {
          // icon: 'cloudSecurity',
          shape: {
            title:
              'Adding a source to cost management when it is not connected to the Internet',
            link: {
              title: 'Watch',
              href: offlineSource,
            },
          },
          permissions: [
            {
              method: 'isOrgAdmin',
            },
          ],
        },
        {
          // icon: 'cloudSecurity',
          shape: {
            title: 'How to use the Cost Management API',
            link: {
              title: 'Read',
              href: costManagementApiMedium,
            },
          },
        },
      ],
    },
  };
};
