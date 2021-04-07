const FIFI_RECOMMENDATIONS = [
  {
    title: 'FIFI recommendations',
    id: 'fifirecommendations',
    sections: [
      {
        title: 'Advsior Reccomendations / Remediate with Ansible',
        id: 'fifi',
        groups: [
          {
            id: 'fifi-1',
            title:
              'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.',
            action: {
              title: 'Advisor Reccomendations',
              href: './insights/advisor',
            },
          },
        ],
      },
      {
        title: 'Compliance Reccomendations / Remediate with Ansible',
        groups: [
          {
            id: 'fifi-2',
            title:
              'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.',
            action: {
              title: 'Complaince Reccomendattions',
              href: './insights/compliance/reports',
            },
          },
        ],
      },
      {
        title: 'Vulnerability Reccomendations / Remediate with Ansible',
        groups: [
          {
            id: 'fifi-3',
            title:
              'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.',
            action: {
              title: 'Vulnerability Reccomendations',
              href: './insights/vulnerability',
            },
          },
        ],
      },
    ],
  },
];

const FIFI_LEARN = [
  {
    shape: {
      icon: 'unknown',
      title: 'Red Hat Insights Data and Security Information',
      link: {
        title: 'Data and Security',
        href: './security/insights',
      },
    },
  },
];

export const getFifiDataSchema = () => ({
  firstPanel: [],
  secondPanel: FIFI_RECOMMENDATIONS,
  configTryLearn: {
    configure: [],
    try: [],
    learn: FIFI_LEARN,
  },
});
