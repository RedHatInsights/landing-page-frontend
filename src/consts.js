import { ChartSpikeIcon, OpenshiftIcon } from '@patternfly/react-icons';
import hcm from './components/hcm.svg';
import ansible from './components/ansible.svg';
import subscriptions from './components/subscriptions.svg';
import migrations from './components/migrations.svg';
import costManagement from './components/cost-management.svg';

import insightsMarketing from './components/marketing/insightsMarketing.svg';
import openShiftMarketing from './components/marketing/openShiftMarketing.svg';
import smartManagementMarketing from './components/marketing/smartManagementMarketing.svg';
import ansibleMarketing from './components/marketing/ansibleMarketing.svg';

// isDevPreview for developer previews
// isPreview for technical previews
// isEarlyAccess for limited access early beta

export const activeTechnologies = [
    {
        entitlement: 'insights',
        marketing: true,
        marketingImage: insightsMarketing,
        marketingText: 'Proactively identify and remediate threats to security, performance, and stability.',
        marketingUrl: 'https://www.redhat.com/en/technologies/management/insights',
        name: 'insights',
        id: 'insights',
        url: 'insights',
        baseApp: '/overview',
        apps: {
            rules: '/rules'
        },
        icon: ChartSpikeIcon,
        title: 'Red Hat Insights',
        emptyTitle: 'Red Hat Insights is included with every Red Hat Enterprise Linux subscription',
        emptyText: 'Proactively identify and remediate threats to security, performance, availability, \
        and stability with Red Hat Insights. Activate Red Hat Insights to get started today.',
        emptyAction: {
            primary: {
                title: 'Get started',
                navigate: 'https://www.redhat.com/wapps/eval/index.html?evaluation_id=1036'
            },
            close: {
                title: 'Not now'
            }
        },
        body: 'Identify and remediate configuration issues in your Red Hat® environments.'
    },
    {
        entitlement: 'smart_management',
        marketing: true,
        marketingImage: smartManagementMarketing,
        marketingText: 'Operate and protect your Red Hat platforms.',
        marketingUrl: 'https://www.redhat.com/en/technologies/management/smart-management',
        id: 'RHEL',
        url: 'rhel',
        baseApp: '/dashboard',
        apps: {
            vulnerability: '/vulnerability',
            compliance: '/compliance',
            'drift analysis': '/drift'
        },
        image: hcm,
        emptyTitle: 'Get started with Cloud Management Services for Red Hat Enterprise Linux',
        emptyText: 'Monitor your Red Hat environments to track system compliance, configuration, \
        security, and efficiency. Upgrade to get started today.',
        emptyAction: {
            primary: {
                title: 'Request an evaluation',
                navigate: 'https://access.redhat.com/products/cloud_management_services_for_rhel/evaluation'
            },
            secondary: {
                title: 'Learn more',
                navigate: 'https://access.redhat.com/products/cloud_management_services_for_rhel'
            },
            close: {
                title: 'Not now'
            }
        },
        title: 'Cloud Management Services for Red Hat Enterprise Linux',
        body: 'Monitor and manage issues for your Red Hat Enterprise Systems.'
    },
    {
        id: 'Openshift',
        url: 'openshift',
        baseApp: '/',
        apps: {
            'cluster manager': '/'
        },
        entitlement: 'openshift',
        marketing: true,
        marketingImage: openShiftMarketing,
        marketingText: 'Install, register, and manage Red Hat OpenShift® 4 clusters.',
        marketingUrl: 'https://try.openshift.com',
        icon: OpenshiftIcon,
        iconProps: {
            style: {
                fill: '#DB242F'
            }
        },
        emptyTitle: 'Get Started with Red Hat Openshift',
        emptyText: 'Test drive industry\'s leading container application platform in your browser, \
        and see how easy it is to use Kubernetes in your organization today.',
        emptyAction: {
            primary: {
                title: 'Try it free'
            }
        },
        title: 'Red Hat OpenShift Cluster Manager',
        body: 'Install, register, and manage Red Hat OpenShift® 4 clusters.'
    },
    {
        id: 'Ansible',
        entitlement: 'ansible',
        url: 'ansible',
        baseApp: '/automation-analytics',
        image: ansible,
        title: 'Red Hat Ansible Automation Platform',
        body: 'Extend your automation with analytics, policy and governance, and content management.',
        apps: {
            'automation analytics': '/automation-analytics',
            'automation hub': '/automation-hub'
        },
        marketing: true,
        marketingImage: ansibleMarketing,
        marketingText: 'Extend your automation with analytics, policy and governance, and content management.',
        marketingUrl: 'http://ansible.com/products/automation-platform',
        emptyTitle: 'Ansible Automation Platform services requires a valid subscription',
        emptyText: 'Get analytics and knowledge on your automation, access to certified content, and more with a \
        Red Hat Ansible Automation Platform subscription.',
        emptyAction: {
            primary: {
                title: 'Learn more',
                navigate: 'https://www.ansible.com/products/automation-platform'
            },
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'Cost Management',
        url: 'cost-management',
        baseApp: '/',
        entitlement: 'cost_management',
        marketing: false,
        disabled: window.location.pathname.indexOf('/beta') !== 0,
        image: costManagement,
        emptyTitle: 'Cost Management technology preview access',
        emptyText: 'Cost Management technology preview is currently \
        restricted to Red Hat customers.',
        emptyAction: {
            primary: {
                title: 'Ok'
            }
        },
        title: 'Cost Management',
        body: 'Analyze, forecast and optimize your Red Hat OpenShift cluster costs in hybrid cloud environments.',
        isPreview: true
    },
    {
        id: 'migrations',
        disabled: window.location.pathname.indexOf('/beta') !== 0,
        entitlement: 'migrations',
        url: 'migrations',
        image: migrations,
        title: 'Migration Services',
        body: 'Get recommendations on migrating your applications and infrastructure to Red Hat.',
        baseApp: '/migration-analytics',
        apps: {
            'migration analytics': '/migration-analytics'
        },
        marketing: false,
        emptyTitle: 'The Migration Service requires that you request an evaluation',
        emptyText: 'To obtain recommendations for your applications and infrastructure, you will need \
        to first analyze your environment using Red Hat CloudForms.',
        emptyAction: {
            // title: 'Request an evaluation',
            // navigate: 'todo',
            close: {
                title: 'Not now'
            }
        },
        isPreview: true
    },
    {
        id: 'subscriptions',
        disabled: window.location.pathname.indexOf('/beta') !== 0,
        entitlement: 'subscriptions',
        url: 'subscriptions',
        image: subscriptions,
        title: 'Subscription Watch',
        body: 'Account-level summaries of your Red Hat subscription utilization',
        baseApp: '/rhel',
        apps: {
            'Red Hat Enterprise Linux': '/rhel-sw'
        },
        marketing: false,
        emptyTitle: 'Subscription Watch',
        emptyText: 'Subscription Watch is an early access beta',
        emptyAction: {
            close: {
                title: 'Not now'
            }
        },
        isEarlyAccess: true
    }
];
