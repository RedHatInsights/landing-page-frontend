const prefix = window.insights.chrome.isBeta() === true ? '/beta/' : '/';

const totalResponseProcessor = async (response) => {
  if (!response?.total) {
    throw 'RHEL systems total count has to be truthy';
  }
  return response;
};

const inventoryLink = `${prefix}insights/inventory`;

const registerLink = `${prefix}insights/registration`;

const complianceReports = `${prefix}compliance/reports`;

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
            id: 'rhel-1',
            title:
              '{count} systems are not yet registered to Insights <In progress>',
            action: {
              title: 'Register systems',
              href: registerLink,
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
            title:
              'Insights has identified {count} incidents affecting your systems.',
            action: {
              title: 'View incidents',
            },
            permissions: [
              {
                method: 'hasPermissions',
                args: [['advisor:*:*']],
              },
            ],
          },
          {
            id: 'rhel-3',
            title: 'Newly released security rule: [Security rule name]',
            action: {
              title: 'View rule',
            },
            permissions: [
              {
                method: 'hasPermissions',
                args: [['vulnerability:*:*']],
              },
            ],
          },
          {
            id: 'rhel-4',
            title:
              '[count]% of systems for policy [Policy name] do not meet compliance.',
            action: {
              title: 'View report',
              href: complianceReports,
            },
            permissions: [
              {
                method: 'hasPermissions',
                args: [['compliance:*:*']],
              },
            ],
          },
          {
            id: 'rhel-5',
            title:
              'Create a remediation playbook to fix issues identified by Insights on your systems',
            action: {
              title: 'Open remediations',
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
      /*
      {
        // permissions: systems that are not registered to insights in your inventory
        id: 'rhel-notconnected-systems',
        shape: {
          title: 'Systems not yet registered to Insights',
          // href: `${inventoryLink}/?status=fresh&status=stale&source=insights&page=1&per_page=50#workloads=SAP&SIDs=&tags=`,
        },
        permissions: [
          {
            method: 'hasPermissions',
            args: [['inventory:*:*']],
          },
        ],
        // api: TBD,
      },
      */
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
