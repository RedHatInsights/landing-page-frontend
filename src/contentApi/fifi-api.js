const FIFI_RECOMMENDATIONS = {
  recs: [
    {
      id: 'fifi-1',
      icon: 'cog',
      title: 'Remediate or mitigate vulnerabilities and configuration issues.',
      action: {
        title: 'Create an Ansible Playbook',
        href: './insights/remediations',
      },
    },
  ],
};

const FIFI_LEARN = [];

const FIFI_TRY = [
  {
    shape: {
      title: 'Sign up for a Smart Management 30-day Evaluation',
      link: {
        title: 'Get Started',
        external: true,
        href: 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux',
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
      title: 'Integrate Red Hat Insights with Satellite 6.7+',
      link: {
        title: 'Learn More',
        external: true,
        href: 'https://www.redhat.com/en/about/videos/setup-and-use-cloud-connector-integrate-insights-satellite',
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
  estate: [],
  recommendations: FIFI_RECOMMENDATIONS,
  configTryLearn: {
    configure: [],
    try: FIFI_TRY,
    learn: FIFI_LEARN,
  },
});
