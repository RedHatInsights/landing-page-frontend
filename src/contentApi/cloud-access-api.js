const noSourcesProcessor = (response) => {
  const count = response?.meta?.count;
  if (count > 0) {
    return {
      ...response,
      icon: 'unknown',
      title: 'Manage your Red Hat products in the cloud',
      description: 'Connect to additional accounts or public cloud providers.',
      link: {
        href:
          './settings/sources?sort_by[]=created_at:desc&limit=50&offset=0&activeVendor=Cloud',
        title: 'Connect with Sources',
      },
    };
  }

  return undefined;
};

const CLOUD_ACCESS_CONFIGURE = [
  {
    key: 'connect-sources',
    url:
      '/api/sources/v3.0/sources?filter[source_type][vendor][eq][]=Amazon&filter[source_type][vendor][eq][]=Azure&filter[source_type][vendor][eq][]=Google',
    responseProcessor: noSourcesProcessor,
    accessor: 'meta.count',
    shape: {
      icon: 'unknown',
      title: 'Connect to your public clouds',
      description:
        'Register a provider to manage your Red Hat products in the cloud.',
      link: {
        href:
          './settings/sources?sort_by[]=created_at:desc&limit=50&offset=0&activeVendor=Cloud',
        title: 'Connect with Sources',
      },
    },
    permissions: [
      {
        method: 'isOrgAdmin',
      },
    ],
  },
];

export const getCloudAccessDataSchema = () => ({
  firstPanel: [],
  secondPanel: {},
  configTryLearn: {
    configure: CLOUD_ACCESS_CONFIGURE,
    try: [],
    learn: [],
  },
});
