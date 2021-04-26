const streamsPrefix = window.insights.chrome.isBeta() ? './' : './beta/';

const ESTATE_CONFIG = [
  {
    section: 'App services',
    items: [
      {
        id: 'managed-services-1',
        url: `https://api.${
          window.insights.chrome.getEnvironment() === 'stage' ? 'stage.' : ''
        }openshift.com/api/managed-services-api/v1/kafkas`,
        accessor: 'total',
        shape: {
          title: 'Kafka Instances',
        },
      },
    ],
  },
];

const RECOMMENDATIONS_ITEMS = {
  recs: [
    {
      id: 'managed-services-1',
      icon: 'lightbulb',
      state: 'info',
      title: 'Learn how to create and use a Kafka instance.',
      action: {
        title: 'View',
        href: `${streamsPrefix}application-services/streams/kafkas?quickstart=getting-started`,
      },
    },
    {
      id: 'managed-services-2',
      icon: 'download',
      title: 'Download and install the Application Services CLI.',
      action: {
        title: 'View',
        external: true,
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka/1/guide/f520e427-cad2-40ce-823d-96234ccbc047',
      },
    },
    {
      id: 'managed-services-3',
      icon: 'lightbulb',
      title:
        'Learn how to connect to your Kafka instance from a Quarkus application.',
      action: {
        title: 'View',
        href: `${streamsPrefix}application-services/streams/kafkas?quickstart=quarkus`,
      },
    },
    {
      id: 'managed-services-4',
      icon: 'play',
      state: 'success',
      title: 'Try Red Hat OpenShift API Management.',
      action: {
        title: 'Learn more',
        external: true,
        href:
          'https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-api-management',
      },
    },
    {
      id: 'managed-services-5',
      icon: 'play',
      state: 'success',
      title: 'Get started with Red Hat OpenShift API Management.',
      action: {
        title: 'Learn more',
        external: true,
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_openshift_api_management/1/guide/53dfb804-2038-4545-b917-2cb01a09ef98',
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
        href:
          'https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-api-management',
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
        href: `${streamsPrefix}application-services/streams/kafkas?quickstart=getting-started`,
      },
    },
  },
  {
    shape: {
      title:
        'Learn how to connect to your Kafka instance from a Quarkus application ',
      link: {
        title: 'Learn more',
        href: `${streamsPrefix}application-services/streams/kafkas?quickstart=quarkus`,
      },
    },
  },
];

export const getManagedServicesDataSchema = () => ({
  firstPanel: ESTATE_CONFIG,
  secondPanel: RECOMMENDATIONS_ITEMS,
  configTryLearn: {
    configure: [],
    try: TRY_ITEMS,
    learn: LEARN_ITEMS,
  },
});
