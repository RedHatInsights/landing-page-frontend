/* eslint-disable no-empty */
import { instance } from '@redhat-cloud-services/frontend-components-utilities/interceptors';

const createNoDataResponse = (error, title, href) => {
  if (error?.error === 'No data') {
    return {
      title,
      count: 0,
      href,
    };
  }

  return undefined;
};

const CLUSTERS_TITLE = 'Ansible Platform Clusters';
const PAST_WEEK_JOBS_TITLE = 'Jobs in the past week';
const MANAGED_HOSTS_TITLE = 'Ansible managed hosts';

export const getAnsiblePlatformClusters = async () => {
  try {
    const clusters = await instance.get('/api/tower-analytics/v0/clusters/');
    const { templates } = clusters;
    return {
      title: CLUSTERS_TITLE,
      count: templates.length,
      href: './ansible/automation-analytics/clusters',
    };
  } catch (error) {
    return createNoDataResponse(
      error,
      CLUSTERS_TITLE,
      './ansible/automation-analytics/clusters'
    );
  }
};

export const getPastWeekJobs = async () => {
  const href =
    'https://cloud.redhat.com/ansible/automation-analytics/job-explorer?attributes[]=id&attributes[]=status&attributes[]=job_type&attributes[]=started&attributes[]=finished&attributes[]=elapsed&attributes[]=created&attributes[]=cluster_name&attributes[]=org_name&attributes[]=most_failed_tasks&limit=5&quick_date_range=last_30_days&sort_by=created%3Adesc';
  try {
    const {
      data: { total_count },
    } = await instance.post('/api/tower-analytics/v1/job_explorer_summary/', {
      quick_date_range: 'last_week',
      attributes: ['total_count'],
    });
    return {
      title: PAST_WEEK_JOBS_TITLE,
      count: total_count,
      href,
    };
  } catch (error) {
    return createNoDataResponse(error, PAST_WEEK_JOBS_TITLE, href);
  }
};

export const getManagedHosts = async () => {
  try {
    const {
      data: { total_unique_host_count },
    } = await instance.post('/api/tower-analytics/v1/host_explorer_summary/', {
      quick_date_range: 'last_2_years',
      granularity: 'yearly',
      attributes: ['total_unique_host_count'],
    });
    return {
      count: total_unique_host_count,
      title: MANAGED_HOSTS_TITLE,
    };
  } catch (error) {
    return createNoDataResponse(error, MANAGED_HOSTS_TITLE);
  }
};

export const getAPPAnalyticsUserEstateItems = () =>
  Promise.all([
    getAnsiblePlatformClusters(),
    getPastWeekJobs(),
    getManagedHosts(),
  ]).then((items) => items.filter((item) => typeof item !== 'undefined'));

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

export const getAPPAnalyticsUserConfigureTryLearn = () =>
  Promise.resolve(APP_USER_CONFIGRE_TRY_LEARN);

export const getAPPAnalyticsUserData = () =>
  Promise.all([
    getAPPAnalyticsUserEstateItems(),
    getAPPAnalyticsUserConfigureTryLearn(),
  ]).then(([estate, configTryLear]) => ({
    estate,
    recommendations: undefined, // does not have this section
    configTryLear,
  }));

export const getCollections = async () => {
  try {
    const {
      meta: { count },
    } = await instance.get('/api/automation-hub/v3/collections');
    return {
      title: 'Collections',
      count,
      href: './ansible/automation-hub/',
    };
  } catch (error) {}
};

export const getPartners = async () => {
  try {
    const {
      meta: { count },
    } = await instance.get('/api/automation-hub/v3/namespaces');
    return {
      title: 'Partners',
      count,
      href: './ansible/automation-hub/partners',
    };
  } catch (error) {}
};

export const getHubUserEstateItems = () =>
  Promise.all([getCollections(), getPartners()]).then((items) =>
    items.filter((item) => typeof item !== 'undefined')
  );

const HUB_USER_CONFIGRE_TRY_LEARN = {
  configure: [
    {
      icon: 'unknown',
      title: 'Sync Red Hat certified collections',
      description:
        'Configure access to sync collections to Private Automation Hub',
      link: {
        title: 'Configure',
        link: './ansible/automation-hub/token',
      },
    },
    {
      icon: 'unknown',
      title: 'Setup user access for your Private Automation Hub',
      description:
        'Manage user access to content and features in Private Automation Hub ',
      link: {
        title: 'Learn more',
        link:
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
        link:
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
        link:
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
        link:
          'https://docs.ansible.com/ansible-tower/latest/html/userguide/projects.html?extIdCarryOver=true&sc_cid=701f2000001Css5AAC#using-collections-in-tower',
      },
    },
    {
      icon: 'unknown',
      title: 'Learn about namespaces',
      description: '',
      link: {
        title: 'Learn more',
        link:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/curating_collections_using_namespaces_in_automation_hub/index',
      },
    },
    {
      icon: 'unknown',
      title: 'Explore Red Hat certified collections',
      link: {
        title: 'Explore',
        link: 'https://www.ansible.com/partners',
      },
    },
  ],
};

export const getHubUserConfigureTryLearn = () =>
  Promise.resolve(HUB_USER_CONFIGRE_TRY_LEARN);

export const getHubUserData = () =>
  Promise.all([getHubUserEstateItems(), getHubUserConfigureTryLearn()]).then(
    ([estate, configTryLear]) => ({
      estate,
      recommendations: undefined, // does not have this section
      configTryLear,
    })
  );

export const getCatalogPortfolios = async () => {
  try {
    const {
      meta: { count },
    } = await instance.get('/api/catalog/v1/portfolios?limit=1');
    return {
      count,
      title: 'Portfolios',
      href: './ansible/catalog/portfolios',
    };
  } catch (error) {}
};

export const getCatalogProducts = async () => {
  try {
    const {
      meta: { count },
    } = await instance.get('/api/catalog/v1/portfolio_items?limit=1');
    return {
      count,
      title: 'Products',
      href: './ansible/catalog/products',
    };
  } catch (error) {}
};

export const getCatalogAdminEstateItems = () =>
  Promise.all([getCatalogPortfolios(), getCatalogProducts()]).then((items) =>
    items.filter((item) => typeof item !== 'undefined')
  );

export const getCatalogAdminRecommendationsItems = async () =>
  Promise.resolve({
    title: 'Catalog',
    id: 'catalog',
    groups: [
      {
        id: 'products',
        description: `Last added products (5)`,
        icon: 'unknown',
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
        action: {
          url: './ansible/catalog/approval/requests',
          title: 'Approvals',
        },
      },
    ],
  });

const CATALOG_ADMIN_CONFIGRE_TRY_LEARN = {
  configure: [
    {
      icon: 'unknown',
      title: 'Configure Automation Services Catalog',
      description: 'Connect platforms, share portfolios, and offer products',
      link: {
        link:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/index',
        title: 'Get started',
      },
    },
    {
      icon: 'unknown',
      title: 'Setup user access',
      description: 'Create user groups for Automation Services Catalog',
      link: {
        link: './settings/rbac/groups',
        title: 'Create',
      },
    },
  ],
  try: [
    {
      icon: 'unknown',
      title: 'Create a new portfolio',
      description: 'Add products and share with your group',
      link: {
        link: './ansible/catalog/portfolios',
        title: 'Get started',
      },
    },
    {
      icon: 'unknown',
      title: 'Connect to your infrastructure',
      description: 'Source playbooks and workflow templates to use as products',
      link: {
        link: './#', // not in doc
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
        link:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/getting_started_with_automation_services_catalog/configuring_approval',
        title: 'Learn more',
      },
    },
    {
      icon: 'unknown',
      title: 'Integrate Automation Services Catalog with your ITSM system',
      link: {
        link:
          'https://access.redhat.com/documentation/en-us/red_hat_ansible_automation_platform/1.2/html/integrating_automation_services_catalog_with_your_it_service_management_itsm_systems/index',
        title: 'Learn more',
      },
    },
  ],
};

export const getCatalogConfigureTryLearn = () =>
  Promise.resolve(CATALOG_ADMIN_CONFIGRE_TRY_LEARN);

export const getCatalogAdminData = () =>
  Promise.all([
    getCatalogAdminEstateItems(),
    getCatalogAdminRecommendationsItems(),
    getCatalogConfigureTryLearn(),
  ]).then(([estate, recommendations, configTryLear]) => ({
    estate,
    recommendations,
    configTryLear,
  }));
