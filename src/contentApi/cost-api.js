const estateResponseProcessor = (response) => {
  if (response?.meta?.count === 0) {
    throw 'No data, do not show';
  }

  return response;
};

const estateRequests = [
  {
    section: 'Cost management',
    items: [
      {
        id: 'cost-ocp-sources',
        url: '/api/cost-management/v1/sources/?source_type=OCP',
        accessor: 'meta.count',
        permissions: [
          {
            method: 'isEntitled',
            args: ['cost_management'],
          },
        ],
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'OpenShift Sources',
          href:
            './settings/sources?type=openshift&application=cost&activeVendor=Red Hat',
        },
      },
      {
        id: 'cost-aws-sources',
        url: '/api/cost-management/v1/sources/?source_type=AWS',
        accessor: 'meta.count',
        permissions: [
          {
            method: 'isEntitled',
            args: ['cost_management'],
          },
        ],
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'Amazon Web Services Sources',
          href:
            './settings/sources?type=amazon&application=cost&activeVendor=Cloud',
        },
      },
      {
        id: 'cost-azure-sources',
        url: '/api/cost-management/v1/sources/?source_type=Azure',
        accessor: 'meta.count',
        permissions: [
          {
            method: 'isEntitled',
            args: ['cost_management'],
          },
        ],
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'Microsoft Azure Sources',
          href:
            './settings/sources?type=azure&application=cost&activeVendor=Cloud',
        },
      },
      {
        id: 'cost-gcp-sources',
        url: '/api/cost-management/v1/sources/?source_type=GCP',
        accessor: 'meta.count',
        permissions: [
          {
            method: 'isEntitled',
            args: ['cost_management'],
          },
        ],
        responseProcessor: estateResponseProcessor,
        shape: {
          title: 'Google Cloud Platform Sources',
          href:
            './settings/sources?type=google&application=cost&activeVendor=Cloud',
        },
      },
    ],
  },
];

const installCostOperator =
  'https://access.redhat.com/documentation/en-us/cost_management_service/2021/html/getting_started_with_cost_management/index';

const offlineSource =
  'https://drive.google.com/file/d/1Ju4aMSvR2Z_etImZ1K9eLYayfSSoUKaQ/view?usp=sharing';

const costManagementApiMedium =
  'https://medium.com/@chargio/using-cost-management-through-the-api-with-a-token-1d0f4c3d349a';

export const getCostDataSchema = () => {
  return {
    firstPanel: estateRequests,
    secondPanel: {
      openshift: [
        {
          section: 'openshift',
          icon: 'lightbulb',
          state: 'info',
          id: 'cost-ocp',
          url: '/api/cost-management/v1/sources/?source_type=OCP',
          accessor: 'meta.count',
          permissions: [
            {
              method: 'isEntitled',
              args: ['cost_management'],
            },
          ],
          condition: {
            when: 'count',
            is: 0,
          },
          title: 'Gain Business Insights for your OpenShift Clusters.',
          description:
            'Install the Cost Operator on your OpenShift cluster to get started.',
          action: {
            title: 'Learn more',
            external: true,
            href: installCostOperator,
          },
        },
      ],
    },
    configTryLearn: {
      configure: [],
      try: [
        {
          shape: {
            title: 'Cost Management now provides forecasting',
            description:
              'We can predict your spend on both OpenShift and public cloud costs.',
            link: {
              title: 'Get started',
              href: './cost-management',
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
          shape: {
            title: 'Cost Management supports Google Cloud Platform',
            description:
              'We can track your OpenShift cluster running on Google Cloud Platform spend.',
            link: {
              title: 'Get started',
              href: './settings/sources/new',
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
          shape: {
            title:
              'Learn about adding a source to cost management when it is not connected to the Internet',
            link: {
              title: 'Watch',
              external: true,
              href: offlineSource,
            },
          },
        },
        {
          shape: {
            title: 'How to use the Cost Management API',
            link: {
              title: 'Read',
              external: true,
              href: costManagementApiMedium,
            },
          },
        },
      ],
    },
  };
};
