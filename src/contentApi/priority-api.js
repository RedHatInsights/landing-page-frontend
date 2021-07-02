const noSourcesProcessor = (response) => {
  const count = response?.meta?.count;
  if (count > 0) {
    return {
      ...response,
      title: 'Manage your Red Hat products in the cloud',
      description: 'Connect to additional accounts or public cloud providers.',
      link: {
        href: './settings/sources?sort_by[]=created_at:desc&limit=50&offset=0&activeVendor=Cloud',
        title: 'Connect with Sources',
      },
    };
  }

  return undefined;
};

export const getPriorityDataSchema = () => ({
  estate: [],
  recommendations: {},
  configTryLearn: {
    configure: [
      {
        id: 'connect-sources',
        url: '/api/sources/v3.0/sources?filter[source_type][vendor][eq][]=Amazon&filter[source_type][vendor][eq][]=Azure&filter[source_type][vendor][eq][]=Google',
        responseProcessor: noSourcesProcessor,
        accessor: 'meta.count',
        shape: {
          title: 'Connect to your public clouds',
          description:
            'Register a provider to manage your Red Hat products in the cloud.',
          link: {
            href: './settings/sources?sort_by[]=created_at:desc&limit=50&offset=0&activeVendor=Cloud',
            title: 'Connect with Sources',
          },
        },
        permissions: [
          {
            method: 'isOrgAdmin',
          },
        ],
      },
      {
        permissions: [
          {
            method: 'isOrgAdmin',
          },
        ],
        shape: {
          title: 'Manage user access permissions.',
          description:
            'Configure and manage user access to applications with pre-defined and/or custom roles. ',
          link: {
            title: 'Get started',
            href: './settings/rbac/roles',
          },
        },
      },
    ],
    try: [
      {
        shape: {
          title: 'Add public cloud sources to better track your finances',
          description:
            'If your OpenShift cluster is running on a public cloud, add that cloud account to Sources for better analysis.',
          link: {
            title: 'Connect',
            href: './settings/sources',
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
          title: 'Red Hat Insights Data and Security Information',
          link: {
            title: 'Learn more',
            href: './security/insights',
          },
        },
      },
    ],
  },
});
