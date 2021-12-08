import catalogAdminPermissions from '../utils/catalog-admin-permissions.json';
import approvalAdminPermissions from '../utils/approval-admin-permissions.json';

const HUB_USER_CONFIGRE_TRY_LEARN = {
  configure: [
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Sync Red Hat certified collections',
        description:
          'Configure access to sync collections to Private Automation Hub.',
        link: {
          title: 'Get started',
          href: './ansible/automation-hub/token',
        },
      },
    },
  ],
  try: [
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Install Private Automation Hub',
        link: {
          title: 'Get started',
          external: true,
          href: 'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/installing_and_upgrading_private_automation_hub/index',
        },
      },
    },
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Manage repositories in Private Automation Hub',
        description:
          'Add community and privately developed collections to your Private Automation Hub.',
        link: {
          title: 'Get started',
          external: true,
          href: 'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/publishing_proprietary_content_collections_in_automation_hub/index',
        },
      },
    },
  ],
  learn: [
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Connect Automation Hub to your automation infrastructure',
        link: {
          title: 'Get started',
          external: true,
          href: 'https://docs.ansible.com/ansible-tower/latest/html/userguide/projects.html?extIdCarryOver=true&sc_cid=701f2000001Css5AAC#using-collections-in-tower',
        },
      },
    },
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Learn about namespaces',
        description:
          'Organize collections content into namespaces users can access.',
        link: {
          title: 'Learn more',
          external: true,
          href: 'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/curating_collections_using_namespaces_in_automation_hub/index',
        },
      },
    },
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Explore Red Hat certified collections',
        link: {
          title: 'Learn more',
          external: true,
          href: 'https://www.ansible.com/partners',
        },
      },
    },
  ],
};

const APP_USER_CONFIGRE_TRY_LEARN = {
  configure: [
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Connect your Ansible platform clusters to Analytics',
        description: 'Send Analytics data to the cloud hosted services.',
        link: {
          title: 'Connect',
          external: true,
          href: 'https://docs.ansible.com/ansible-tower/latest/html/administration/usability_data_collection.html',
        },
      },
    },
  ],
  try: [
    {
      permissions: [
        {
          method: 'isEntitled',
          args: ['ansible'],
        },
      ],
      shape: {
        title: 'Tour Job Explorer',
        description:
          'View job run details on Ansible platform clusters across your organizations.',
        link: {
          title: 'Get started',
          href: './ansible/automation-analytics/job-explorer?attributes[]=id&attributes[]=status&attributes[]=job_type&attributes[]=started&attributes[]=finished&attributes[]=elapsed&attributes[]=created&attributes[]=cluster_name&attributes[]=org_name&attributes[]=most_failed_tasks&limit=5',
        },
      },
    },
  ],
  learn: [
    {
      shape: {
        title: 'Get started with Automation Analytics',
        link: {
          title: 'Get started',
          external: true,
          href: 'https://docs.ansible.com/ansible-tower/latest/html/administration/usability_data_collection.html#automation-analytics',
        },
      },
    },
  ],
};

const CATALOG_ADMIN_CONFIGURE_TRY_LEARN = {
  configure: [
    {
      shape: {
        title: 'Configure Automation Services Catalog',
        description: 'Connect platforms, share portfolios, and offer products.',
        link: {
          external: true,
          href: 'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/index',
          title: 'Get started',
        },
      },
      permissions: [
        {
          method: 'hasPermissions',
          args: [catalogAdminPermissions],
        },
      ],
    },
  ],
  try: [
    {
      shape: {
        title: 'Create a new portfolio',
        description: 'Add products and share with your group.',
        link: {
          href: './ansible/catalog/portfolios',
          title: 'Get started',
        },
      },
      permissions: [
        {
          method: 'hasPermissions',
          args: [['catalog:portfolios:create']],
        },
      ],
    },
  ],
  learn: [
    {
      shape: {
        title: 'Govern access with Approval',
        description:
          'Restrict product orders and apply approval processes to portfolios and platforms.',
        link: {
          external: true,
          href: 'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/configuring_approval',
          title: 'Learn more',
        },
      },
      permissions: [
        {
          method: 'hasPermissions',
          args: [approvalAdminPermissions],
        },
      ],
    },
    {
      shape: {
        title: 'Integrate Automation Services Catalog with your ITSM system',
        link: {
          external: true,
          href: 'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/integrating_automation_services_catalog_with_your_it_service_management_itsm_systems/index',
          title: 'Learn more',
        },
      },
      permissions: [
        {
          method: 'hasPermissions',
          args: [catalogAdminPermissions],
        },
      ],
    },
  ],
};

const CONFIGURE_TRY_LEARN = {
  configure: [
    ...HUB_USER_CONFIGRE_TRY_LEARN.configure,
    ...APP_USER_CONFIGRE_TRY_LEARN.configure,
    ...CATALOG_ADMIN_CONFIGURE_TRY_LEARN.configure,
  ],
  try: [
    ...HUB_USER_CONFIGRE_TRY_LEARN.try,
    ...APP_USER_CONFIGRE_TRY_LEARN.try,
    ...CATALOG_ADMIN_CONFIGURE_TRY_LEARN.try,
  ],
  learn: [
    ...HUB_USER_CONFIGRE_TRY_LEARN.learn,
    ...APP_USER_CONFIGRE_TRY_LEARN.learn,
    ...CATALOG_ADMIN_CONFIGURE_TRY_LEARN.learn,
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
    section: 'Ansible Automation Platform',
    items: [
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
          href: './ansible/automation-analytics/job-explorer?attributes[]=id&attributes[]=status&attributes[]=job_type&attributes[]=started&attributes[]=finished&attributes[]=elapsed&attributes[]=created&attributes[]=cluster_name&attributes[]=org_name&attributes[]=most_failed_tasks&limit=5&quick_date_range=last_30_days&sort_by=created%3Adesc',
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
        url: '/api/sources/v3.1/applications?filter[application_type][name][contains]=catalog',
        accessor: 'meta.count',
        shape: {
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
    ],
  },
];

export const RECOMMENDATIONS_ITEMS = {
  recs: [
    // {
    //   id: 'products',
    //   title: {
    //     id: 'last-added-products',
    //     defaultMessage: 'Last added products ({count})',
    //   },
    //   url: '/api/catalog/v1/portfolio_items?limit=5',
    //   accessor: 'data.length',
    //   icon: 'history',
    //   permissions: [
    //     {
    //       method: 'hasPermissions',
    //       args: [['catalog:portfolio_items:read']],
    //     },
    //   ],
    //   action: {
    //     url:
    //       'https://cloud.stage.redhat.com/docs/api/catalog#operations-PortfolioItem-listPortfolioItems',
    //     title: 'Products',
    //   },
    // },
    {
      id: 'orders',
      description: {
        id: 'last-added-orders',
        defaultMessage: 'You have ({count}) recent orders.',
      },
      condition: {
        when: 'data.length',
        isNot: 0,
      },
      url: '/api/catalog/v1/orders?limit=5',
      accessor: 'data.length',
      icon: 'history',
      permissions: [
        {
          method: 'hasPermissions',
          args: [['catalog:orders:read', 'catalog:order_items:read']],
        },
      ],
      action: {
        href: './ansible/catalog/orders',
        title: 'View Automation Services Catalog orders',
      },
    },
    {
      id: 'approvals',
      description: `Govern content with approval processes.`,
      icon: 'list',
      permissions: [
        {
          method: 'hasPermissions',
          args: [['approval:requests:read']],
        },
      ],
      action: {
        href: './ansible/catalog/approval/requests',
        title: 'View Automation Services Catalog approvals',
      },
    },
  ],
};

export const getAnsibleDataSchema = () => ({
  estate: ansibleEstateRequests,
  recommendations: RECOMMENDATIONS_ITEMS,
  configTryLearn: CONFIGURE_TRY_LEARN,
});
