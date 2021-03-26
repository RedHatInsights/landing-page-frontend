const prefix = window.insights.chrome.isBeta() === true ? '/beta/' : '/';

const inventoryLink = `${prefix}insights/inventory`;

const registerLink = `${prefix}insights/registration`;

const complianceReports = `${prefix}compliance/reports`;

const remediations = `${prefix}insights/remediations`;

export const createRhelSchema = () =>
  Promise.resolve({
    firstPanel: [
      {
        // permissions: systems registered
        section: 'RHEL',
        title: 'Connected systems',
        api: '/api/inventory/v1/hosts',
        href: inventoryLink,
      },
      {
        // permissions: systems registered and some are not checked in timeframe
        title: 'Stale systems',
        api: '/api/inventory/v1/hosts', // probably some status=stale too
        href: `${inventoryLink}/?status=stale&source=insights&page=1&per_page=50`,
      },
      {
        // permissions: systems with explots
        title: 'Systems exposed to Exploit Risks',
        // api: not ready,
        href: '/api/vulnerability/v1/dashboard', // yeah I know, nonsense
      },
      {
        // permissions: systems with security rules
        title: 'Systems exposed to CVEs with security rules',
        api: '/api/vulnerability/v1/dashboard',
        href: '/api/vulnerability/v1/dashboard', // yeah I know, nonsense
      },
      {
        // permissions: sap systems > 0
        title: 'SAP systems',
        api: '/api/inventory/v1/system_profile/sap_system',
        href: `${inventoryLink}/?status=fresh&status=stale&source=insights&page=1&per_page=50#workloads=SAP&SIDs=&tags=`,
      },
      {
        // permissions: systems that are not registered to insights in your inventory
        title: 'Systems not yet registered to Insights',
        // api: TBD,
      },
    ],
    secondPanel: [
      {
        title: 'RHEL recommendations',
        id: 'rhel-recommendations',
        sections: [
          {
            title: 'RHEL recommendations',
            groups: [
              {
                // permissions: systemsRegistered > 0
                //icon: 'automation',
                // api: TBD,
                id: 'rhel-1',
                title: '{count} systems are not yet registered to Insights',
                action: {
                  title: 'Register systems',
                  href: registerLink,
                },
              },
              {
                // permissions: systemsRegistered > 0
                //icon: 'automation',
                // api: 'Y',
                id: 'rhel-2',
                title:
                  'Insights has identified {count} incidents affecting your systems.',
                action: {
                  title: 'View incidents',
                  // href: TBD,
                },
              },
              {
                // permissions: If there is a security rule released in the last 14 days
                //icon: 'automation',
                // api: ?,
                id: 'rhel-3',
                title: 'Newly released security rule: [Security rule name]',
                action: {
                  title: 'View rule',
                  // href: vulnerability rule,
                },
              },
              {
                // permissions: If they have compliance; If a policy is reporting less than 100% compliance
                //icon: 'automation',
                // api: ?,
                id: 'rhel-4',
                title:
                  '[count]% of systems for policy [Policy name] do not meet compliance.',
                action: {
                  title: 'View report',
                  href: complianceReports,
                },
              },
              {
                // permissions: any user
                //icon: 'automation',
                id: 'rhel-5',
                title:
                  'Create a remediation playbook to fix issues identified by Insights on your systems',
                action: {
                  title: 'Open remediations',
                  href: remediations,
                },
              },
              {
                // permissions: no systems
                //icon: 'automation',
                api: '/api/inventory/v1/hosts',
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
    ],
    configTryLearn: {
      configure: [],
      try: [],
      learn: [],
    },
  });
