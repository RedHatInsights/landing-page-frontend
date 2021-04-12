const FIFI_RECOMMENDATIONS = {
  recs: [
    {
      id: 'fifi-1',
      icon: 'cog',
      title:
        'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.',
      action: {
        title: 'View',
        href: './insights/advisor',
      },
    },

    {
      id: 'fifi-2',
      icon: 'cog',
      title:
        'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.',
      action: {
        title: 'View',
        href: './insights/compliance/reports',
      },
    },

    {
      id: 'fifi-3',
      icon: 'cog',
      title:
        'Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.',
      action: {
        title: 'View',
        href: './insights/vulnerability',
      },
    },
  ],
};

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

const FIFI_TRY = [
  {
    shape: {
      icon: 'unknown',
      title: 'Sign up for a Smart Managment 30 day Evaluation',
      link: {
        title: 'Get Started',
        href:
          'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux',
      },
    },
    permissions: [
      {
        method: 'isNotEntitled',
        args: ['smart_management'],
      },
    ],
  },
  {
    shape: {
      icon: 'unknown',
      title: 'Integrate Insights with Satellite 6.7+',
      link: {
        title: 'Learn More',
        href:
          'https://www.redhat.com/en/about/videos/setup-and-use-cloud-connector-integrate-insights-satellite',
      },
    },
    permissions: [
      {
        method: 'isEntitled',
        args: ['smart_management'],
      },
    ],
  },
];

export const getFifiDataSchema = () => ({
  firstPanel: [],
  secondPanel: FIFI_RECOMMENDATIONS,
  configTryLearn: {
    configure: [],
    try: FIFI_TRY,
    learn: FIFI_LEARN,
  },
});
