import processRequest from './request-processor';

const HUB_USER_CONFIGRE_TRY_LEARN = {
  configure: [
    {
      icon: 'unknown',
      title: 'Sync Red Hat certified collections',
      description:
        'Configure access to sync collections to Private Automation Hub',
      link: {
        title: 'Configure',
        href: './ansible/automation-hub/token',
      },
    },
    {
      icon: 'unknown',
      title: 'Setup user access for your Private Automation Hub',
      description:
        'Manage user access to content and features in Private Automation Hub ',
      link: {
        title: 'Learn more',
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/managing_user_access_in_private_automation_hub/index',
      },
    },
  ],
  try: [
    {
      icon: 'unknown',
      title: 'Install Private Automation Hub',
      link: {
        title: 'Get started',
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/installing_and_upgrading_private_automation_hub/index',
      },
    },
    {
      icon: 'unknown',
      title: 'Manage repositories in Private Automation Hub',
      description:
        'Add community and privately developed collections to your Private Automation Hub',
      link: {
        title: 'Get started',
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/publishing_proprietary_content_collections_in_automation_hub/index',
      },
    },
  ],
  learn: [
    {
      icon: 'unknown',
      title: 'How to connect Automation Hub to your automation infrastructure',
      link: {
        title: 'Learn more',
        href:
          'https://docs.ansible.com/ansible-tower/latest/html/userguide/projects.html?extIdCarryOver=true&sc_cid=701f2000001Css5AAC#using-collections-in-tower',
      },
    },
    {
      icon: 'unknown',
      title: 'Learn about namespaces',
      description: '',
      link: {
        title: 'Learn more',
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/curating_collections_using_namespaces_in_automation_hub/index',
      },
    },
    {
      icon: 'unknown',
      title: 'Explore Red Hat certified collections',
      link: {
        title: 'Explore',
        href: 'https://www.ansible.com/partners',
      },
    },
  ],
};

const APP_USER_CONFIGRE_TRY_LEARN = {
  configure: [
    {
      icon: 'unknown',
      title: 'Connect your Ansible platform clusters to Analytics',
      description: 'Send Analytics data to the cloud hosted services ',
      link: {
        title: 'Configure',
        href:
          'https://docs.ansible.com/ansible-tower/latest/html/administration/usability_data_collection.html',
      },
    },
    {
      icon: 'unknown',
      title: 'Setup user access',
      link: {
        title: 'Create',
        href: './settings/rbac/users',
      },
    },
  ],
  try: [
    {
      icon: 'unknown',
      title: 'Calculate your automation savings',
      link: {
        title: 'Calculate',
        href: './ansible/automation-analytics/automation-calculator',
      },
    },
    {
      icon: 'unknown',
      title: 'Tour Job Explorer',
      link: {
        title: 'View',
        href:
          './ansible/automation-analytics/job-explorer?attributes[]=id&attributes[]=status&attributes[]=job_type&attributes[]=started&attributes[]=finished&attributes[]=elapsed&attributes[]=created&attributes[]=cluster_name&attributes[]=org_name&attributes[]=most_failed_tasks&limit=5',
      },
    },
  ],
  learn: [
    {
      icon: 'unknown',
      title: 'Learn more about Automation Analytics',
      link: {
        title: 'Learn more',
        href: './ansible/automation-analytics/automation-calculator',
      },
    },
  ],
};

const CATALOG_ADMIN_CONFIGuRE_TRY_LEARN = {
  configure: [
    {
      icon: 'unknown',
      title: 'Configure Automation Services Catalog',
      description: 'Connect platforms, share portfolios, and offer products',
      link: {
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/index',
        title: 'Get started',
      },
    },
    {
      icon: 'unknown',
      title: 'Setup user access',
      description: 'Create user groups for Automation Services Catalog',
      link: {
        href: './settings/rbac/groups',
        title: 'Create',
      },
    },
  ],
  try: [
    {
      icon: 'unknown',
      title: 'Create a new portfolio',
      description: 'Add products and share with your group',
      permissions: [
        {
          method: 'hasPermissions',
          args: [['catalog:portfolios:create']],
        },
      ],
      link: {
        href: './ansible/catalog/portfolios',
        title: 'Get started',
      },
    },
    {
      icon: 'unknown',
      title: 'Connect to your infrastructure',
      permissions: [
        {
          method: 'isOrgAdmin',
        },
      ],
      description: 'Source playbooks and workflow templates to use as products',
      link: {
        href: './#', // not in doc
        title: 'Connect',
      },
    },
  ],
  learn: [
    {
      icon: 'unknown',
      title: 'Govern access with Approval',
      description:
        'Restrict product orders and apply approval processes to portfolios and platforms',
      link: {
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/configuring_approval',
        title: 'Learn more',
      },
    },
    {
      icon: 'unknown',
      title: 'Integrate Automation Services Catalog with your ITSM system',
      link: {
        href:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/integrating_automation_services_catalog_with_your_it_service_management_itsm_systems/index',
        title: 'Learn more',
      },
    },
  ],
};

const CONFIGURE_TRY_LEARN = {
  configure: [
    ...HUB_USER_CONFIGRE_TRY_LEARN.configure,
    ...APP_USER_CONFIGRE_TRY_LEARN.configure,
    ...CATALOG_ADMIN_CONFIGuRE_TRY_LEARN.configure,
  ],
  try: [
    ...HUB_USER_CONFIGRE_TRY_LEARN.try,
    ...APP_USER_CONFIGRE_TRY_LEARN.try,
    ...CATALOG_ADMIN_CONFIGuRE_TRY_LEARN.try,
  ],
  learn: [
    ...HUB_USER_CONFIGRE_TRY_LEARN.learn,
    ...APP_USER_CONFIGRE_TRY_LEARN.learn,
    ...CATALOG_ADMIN_CONFIGuRE_TRY_LEARN.learn,
  ],
};

const createNoDataResponse = (error, shape) => {
  if (error?.error === 'No data') {
    return {
      ...shape,
      count: 0,
    };
  }

  return undefined;
};

const CLUSTERS_TITLE = 'Ansible Platform Clusters';
const PAST_WEEK_JOBS_TITLE = 'Jobs in the past week';
// const MANAGED_HOSTS_TITLE = 'Ansible managed hosts';

const ansibleEstateRequests = [
  {
    id: 'ansible-platform-clusters',
    url: '/api/tower-analytics/v0/clusters/',
    accessor: 'templates.length',
    shape: {
      section: 'Ansible Automation Platform',
      title: CLUSTERS_TITLE,
      href: './ansible/automation-analytics/clusters',
    },
    permissions: [
      {
        method: 'isEntitled',
        args: ['ansible'],
      },
    ],
    errorProcessor: createNoDataResponse,
  },
  {
    id: 'ansible-past-jobs',
    url: '/api/tower-analytics/v1/job_explorer_summary/',
    accessor: 'data.total_count',
    method: 'post',
    args: [
      {
        quick_date_range: 'last_week',
        attributes: ['total_count'],
      },
    ],
    permissions: [
      {
        method: 'isEntitled',
        args: ['ansible'],
      },
    ],
    shape: {
      title: PAST_WEEK_JOBS_TITLE,
      href:
        'https://cloud.redhat.com/ansible/automation-analytics/job-explorer?attributes[]=id&attributes[]=status&attributes[]=job_type&attributes[]=started&attributes[]=finished&attributes[]=elapsed&attributes[]=created&attributes[]=cluster_name&attributes[]=org_name&attributes[]=most_failed_tasks&limit=5&quick_date_range=last_30_days&sort_by=created%3Adesc',
    },
    errorProcessor: createNoDataResponse,
  },
  // Acorrding to the docs, this request is no longer requried. Keep it here for reference byt should be deleted before the summit release if not re-introduced
  // {
  //   url: '/api/tower-analytics/v1/host_explorer_summary/',
  //   method: 'post',
  //   accessor: 'data.total_unique_host_count',
  //   args: [
  //     {
  //       quick_date_range: 'last_2_years',
  //       granularity: 'yearly',
  //       attributes: ['total_unique_host_count'],
  //     },
  //   ],
  //   shape: {
  //     title: MANAGED_HOSTS_TITLE,
  //   },
  //   errorProcessor: createNoDataResponse,
  // },
  {
    id: 'ansible-collections',
    url: '/api/automation-hub/v3/collections',
    accessor: 'meta.count',
    shape: {
      title: 'Collections',
      href: './ansible/automation-hub/',
    },
    permissions: [
      {
        method: 'isEntitled',
        args: ['ansible'],
      },
    ],
  },
  {
    id: 'ansible-partners',
    url: '/api/automation-hub/v3/namespaces',
    accessor: 'meta.count',
    shape: {
      title: 'Partners',
      href: './ansible/automation-hub/partners',
    },
    permissions: [
      {
        method: 'isEntitled',
        args: ['ansible'],
      },
    ],
  },
  {
    id: 'ansible-platforms',
    url:
      '/api/sources/v3.1/applications?filter[application_type][name][contains]=catalog',
    accessor: 'meta.count',
    shape: {
      section: 'Catalog', // don't know no data
      title: 'Platforms',
      href: './ansible/catalog/platforms',
    },
    permissions: [
      {
        method: 'isOrgAdmin',
      },
    ],
  },
  {
    id: 'ansible-portfolios',
    url: '/api/catalog/v1/portfolios?limit=1',
    accessor: 'meta.count',
    permissions: [
      {
        method: 'hasPermissions',
        args: [['catalog:portfolios:read']],
      },
    ],
    shape: {
      title: 'Portfolios',
      href: './ansible/catalog/portfolios',
    },
  },
  {
    id: 'ansible-portfolio-items',
    url: '/api/catalog/v1/portfolio_items?limit=1',
    accessor: 'meta.count',
    permissions: [
      {
        method: 'hasPermissions',
        args: [['catalog:portfolio_items:read']],
      },
    ],
    shape: {
      title: 'Products',
      href: './ansible/catalog/products',
    },
  },
];

export const RECOMMENDATIONS_ITEMS = [
  {
    title: 'Ansible recommendations',
    id: 'ansiblerrecommendations',
    sections: [
      {
        title: 'Catalog',
        id: 'catalog',
        groups: [
          {
            id: 'products',
            description: `Last added products (5)`,
            icon: 'unknown',
            permissions: [
              {
                method: 'hasPermissions',
                args: [['catalog:portfolio_items:read']],
              },
            ],
            action: {
              url:
                'https://cloud.stage.redhat.com/docs/api/catalog#operations-PortfolioItem-listPortfolioItems',
              title: 'Products',
            },
          },
          {
            id: 'orders',
            description: `Last orders (5)`,
            icon: 'unknown',
            permissions: [
              {
                method: 'hasPermissions',
                args: [['catalog:orders:read', 'catalog:order_items:read']],
              },
            ],
            action: {
              url:
                'https://cloud.stage.redhat.com/docs/api/catalog#operations-Order-listOrders',
              title: 'Orders',
            },
          },
          {
            id: 'approvals',
            description: `Approvals`,
            icon: 'unknown',
            permissions: [
              {
                method: 'hasPermissions',
                args: [['approval:requests:read']],
              },
            ],
            action: {
              url: './ansible/catalog/approval/requests',
              title: 'Approvals',
            },
          },
        ],
      },
    ],
  },
];

export const getAnsibleDataSchema = () => ({
  firstPanel: ansibleEstateRequests,
  secondPanel: RECOMMENDATIONS_ITEMS,
  configTryLearn: CONFIGURE_TRY_LEARN,
});
