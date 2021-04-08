const prefix = window.insights.chrome.isBeta() === true ? '/beta/' : '/';

const totalResponseProcessor = async (response) => {
  if (!response?.total) {
    throw 'RHEL systems total count has to be truthy';
  }
  return response;
};

const inventoryLink = `${prefix}insights/inventory`;

const registerLink = `${prefix}insights/registration`;

// const complianceReports = `${prefix}compliance/reports`;

const remediations = `${prefix}insights/remediations`;

const RECOMMENDATIONS_ITEMS = [
  {
    title: 'RHEL recommendations',
    id: 'rhel-recommendations',
    sections: [
      {
        title: 'RHEL recommendations',
        groups: [
          {
            id: 'rhel-2',
            icon: 'error',
            state: 'error',
            url: '/api/insights/v1/rule/?impacting=true&limit=1&incident=true',
            title: {
              id: 'rhel-incidents-recommendation',
              defaultMessage:
                'Insights has identified {count} incidents affecting your systems.',
            },
            accessor: 'meta.count',
            condition: {
              when: 'count',
              isNot: 0,
            },
            permissions: [
              {
                method: 'hasPermissions',
                args: [['inventory:*:*']],
              },
            ],
          },
          {
            id: 'rhel-2',
            url: '/api/insights/v1/rule/?impacting=true&limit=1&incident=true',
            title: {
              id: 'rhen-incidents-recommendation',
              defaultMessage:
                'Insights has identified {count} incidents affecting your systems.',
            },
            accessor: 'meta.count',
            condition: {
              when: 'count',
              isNot: 0,
            },
            action: {
              title: 'View',
            },
            permissions: [
              {
                method: 'hasPermissions',
                args: [['advisor:*:*']],
              },
            ],
          },
          // {
          //   id: 'rhel-3',
          //   title: 'Newly released security rule: [Security rule name]',
          //   action: {
          //     title: 'View rule',
          //   },
          //   permissions: [
          //     {
          //       method: 'hasPermissions',
          //       args: [['vulnerability:*:*']],
          //     },
          //   ],
          // },
          {
            id: 'rhel-5',
            icon: 'cog',
            title:
              'Create a remediation playbook to fix issues identified by Insights on your systems',
            action: {
              title: 'Open',
              href: remediations,
            },
            permissions: [
              {
                method: 'hasPermissions',
                args: [['remediations:*:*']],
              },
            ],
          },
          {
            url: '/api/inventory/v1/hosts',
            icon: 'play',
            state: 'success',
            condition: { when: 'total', is: 0 },
            id: 'rhel-6',
            title: 'Get Insights for your systems',
            action: {
              title: 'Register systems',
              href: registerLink,
            },
          },
        ],
      },
    ],
  },
];

const ESTATE_CONFIG = [
  {
    section: 'RHEL',
    items: [
      {
        id: 'rhel-connected-systems',
        url: '/api/inventory/v1/hosts',
        accessor: 'total',
        shape: {
          section: 'RHEL',
          title: 'Connected systems',
          href: inventoryLink,
        },
        permissions: [
          {
            method: 'hasPermissions',
            args: [['inventory:*:*']],
          },
        ],
      },
      {
        id: 'rhel-stale-systems',
        title: 'Stale systems',
        accessor: 'total',
        url: '/api/inventory/v1/hosts?staleness=stale',
        shape: {
          title: 'Stale systems',
          href: `${inventoryLink}/?status=stale&source=insights&page=1&per_page=50`,
        },
        permissions: [
          {
            method: 'hasPermissions',
            args: [['inventory:*:*']],
          },
        ],
      },
      {
        id: 'rhel-vuln-ves',
        permissions: [
          {
            method: 'hasPermissions',
            args: [['vulnerability:*:*']],
          },
        ],
        shape: {
          title: 'Systems exposed to CVEs with security rules',
        },
        accessor: 'system_count',
        url:
          '/api/vulnerability/v1/dashboard?tags=vulnerability%2Fusage%3Dserver&sap_sids=ABC%2CCDE',
      },
      {
        // permissions: sap systems > 0
        id: 'rhel-sap-systems',
        permissions: [
          {
            method: 'hasPermissions',
            args: [['inventory:*:*']],
          },
        ],
        responseProcessor: totalResponseProcessor,
        shape: {
          title: 'SAP systems',
          href: `${inventoryLink}/?status=fresh&status=stale&source=insights&page=1&per_page=50#workloads=SAP&SIDs=&tags=`,
        },
        accessor: 'total',
        url: '/api/inventory/v1/system_profile/sap_system',
      },
    ],
  },
];

export const createRhelSchema = () => ({
  firstPanel: ESTATE_CONFIG,
  secondPanel: RECOMMENDATIONS_ITEMS,
  configTryLearn: {
    configure: [],
    try: [],
    learn: [],
  },
});
