const prefix = window.insights.chrome.isBeta() === true ? '/beta/' : '/';

const inventoryLink = `${prefix}insights/inventory`;

const registerLink = `${prefix}insights/registration`;

// const complianceReports = `${prefix}compliance/reports`;

const remediations = `${prefix}insights/remediations`;

const RECOMMENDATIONS_ITEMS = {
  rhel: [
    {
      id: 'rhel-2',
      icon: 'error',
      state: 'error',
      url: '/api/insights/v1/rule/?impacting=true&limit=1&incident=true',
      title: {
        id: 'rhen-incidents-recommendation',
        defaultMessage:
          'Insights has identified {count} incidents affecting your systems.',
      },
      accessor: 'meta.count',
      condition: {
        when: 'meta.count',
        isNot: 0,
      },
      action: {
        title: {
          id: 'rhel-incidents-action-text',
          defaultMessage: 'View {count} incidents',
        },
        href: './insights/advisor/recommendations?impacting=true&rule_status=enabled&sort=-publish_date&limit=10&offset=0&reports_shown=true&incident=true',
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
      title: 'Fix issues identified by Insights on your systems.',
      action: {
        title: 'Create a remediation playbook',
        href: remediations,
      },
    },
    {
      url: '/api/inventory/v1/hosts',
      icon: 'play',
      state: 'success',
      condition: { when: 'total', is: 0 },
      id: 'rhel-6',
      title: 'Proactively reduce risk and optimize spending.',
      action: {
        title: 'Get Insights for your systems',
        href: registerLink,
      },
    },
  ],
};

const ESTATE_CONFIG = [
  {
    section: 'RHEL',
    items: [
      {
        id: 'rhel-connected-systems',
        url: '/api/inventory/v1/hosts',
        accessor: 'total',
        condition: {
          when: 'total',
          isNot: 0,
        },
        shape: {
          section: 'RHEL',
          title: 'Connected systems',
          href: inventoryLink,
        },
        permissions: [
          {
            method: 'loosePermissions',
            args: [
              ['inventory:*:*', 'inventory:*:read', 'inventory:hosts:read'],
            ],
          },
        ],
      },
      {
        id: 'rhel-stale-systems',
        accessor: 'total',
        condition: {
          when: 'total',
          isNot: 0,
        },
        url: '/api/inventory/v1/hosts?staleness=stale',
        shape: {
          title: 'Stale systems',
          href: `${inventoryLink}/?status=stale&source=insights&page=1&per_page=50`,
        },
        permissions: [
          {
            method: 'loosePermissions',
            args: [
              ['inventory:*:*', 'inventory:*:read', 'inventory:hosts:read'],
            ],
          },
        ],
      },
      {
        id: 'rhel-sap-systems',
        condition: {
          when: 'total',
          isNot: 0,
        },
        permissions: [
          {
            method: 'loosePermissions',
            args: [
              ['inventory:*:*', 'inventory:*:read', 'inventory:hosts:read'],
            ],
          },
        ],
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
  estate: ESTATE_CONFIG,
  recommendations: RECOMMENDATIONS_ITEMS,
  configTryLearn: {
    configure: [],
    try: [],
    learn: [],
  },
});
