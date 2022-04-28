const stageEnvs = ['stage', 'qaprodauth'];

const ESTATE_CONFIG = [
  {
    section: 'App services',
    items: [
      {
        id: 'managed-services-1',
        url: `https://api.${
          stageEnvs.includes(window.insights.chrome.getEnvironment())
            ? 'stage.'
            : ''
        }openshift.com/api/kafkas_mgmt/v1/kafkas`,
        accessor: 'total',
        shape: {
          title: 'Kafka Instances',
          href: './application-services/streams/kafkas',
        },
      },
    ],
  },
];

const RECOMMENDATIONS_ITEMS = {
  recs: [
    {
      id: 'managed-services-1',
      icon: 'info',
      description: 'Learn how to create and use a Kafka instance.',
      action: {
        title: 'Get started with RHOSAK',
        href: './application-services/streams/resources?quickstart=getting-started',
      },
    },
    {
      id: 'managed-services-2',
      icon: 'download',
      description: 'Get started using your managed Kafka instances.',
      action: {
        title: 'Download and install the Application Services CLI',
        external: true,
        href: 'https://access.redhat.com/documentation/en-us/red_hat_openshift_application_services/1/guide/bb30ee92-9e0a-4fd6-a67f-aed8910d7da3',
      },
    },
    {
      id: 'managed-services-3',
      icon: 'lightbulb',
      description:
        'Learn how to connect to your Kafka instance from a Quarkus application.',
      action: {
        title: 'Get started with Quarkus apps and Streams for Apache Kafka',
        href: './application-services/streams/resources?quickstart=quarkus',
      },
    },
    {
      id: 'managed-services-4',
      icon: 'play',
      description:
        'Deploy, monitor, and control APIs throughout their entire life cycle.',
      action: {
        title: 'Try Red Hat OpenShift API Management',
        external: true,
        href: 'https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-api-management',
      },
    },
    {
      id: 'managed-services-5',
      icon: 'play',
      description:
        'Deploy, monitor, and control APIs throughout their entire life cycle.',
      action: {
        title: 'Get started with Red Hat OpenShift API Management',
        external: true,
        href: 'https://access.redhat.com/documentation/en-us/red_hat_openshift_api_management/1/guide/53dfb804-2038-4545-b917-2cb01a09ef98',
      },
    },
  ],
};

const TRY_ITEMS = [
  {
    shape: {
      title: 'Try Red Hat OpenShift API Management',
      link: {
        title: 'Learn more',
        external: true,
        href: 'https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-api-management',
      },
    },
  },
];

const LEARN_ITEMS = [
  {
    shape: {
      title: 'Learn how to create and use a Kafka instance',
      link: {
        title: 'Learn more',
        href: './application-services/streams/resources?quickstart=getting-started',
      },
    },
  },
  {
    shape: {
      title:
        'Learn how to connect to your Kafka instance from a Quarkus application ',
      link: {
        title: 'Learn more',
        href: './application-services/streams/resources?quickstart=quarkus',
      },
    },
  },
];

export const getManagedServicesDataSchema = () => ({
  estate: ESTATE_CONFIG,
  recommendations: RECOMMENDATIONS_ITEMS,
  configTryLearn: {
    configure: [],
    try: TRY_ITEMS,
    learn: LEARN_ITEMS,
  },
});
