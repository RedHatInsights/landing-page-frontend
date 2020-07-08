import React from 'react';
import Automation from './components/Automation.svg';
import Subscriptions from './components/Subscriptions.svg';
import Cost from './components/Cost.svg';
import Insights from './components/Insights.svg';
import Migrations from './components/Migrations.svg';
import Openshift from './components/Openshift.svg';

import insightsMarketing from './components/marketing/insightsMarketing.svg';
import openShiftMarketing from './components/marketing/openShiftMarketing.svg';
import ansibleMarketing from './components/marketing/ansibleMarketing.svg';

// isDevPreview for developer previews
// isPreview for technical previews
// isEarlyAccess for limited access early beta

// isUnderMaintenance to disable all apps in a bundle
// example: isUnderMaintenance: true

// isUnderMaintenanceApps list of apps to disable in a bundle
/* example:
    isUnderMaintenanceApps: [
        'vulnerability',
        'compliance'
    ]
*/

export const activeTechnologies = [
    {
        entitlement: 'insights',
        marketing: true,
        marketingImage: insightsMarketing,
        marketingText: 'Proactively identify and remediate threats to security, performance, and stability.',
        marketingUrls: {
            learnMore: 'https://www.redhat.com/en/technologies/management/insights'
        },
        name: 'insights',
        id: 'insights',
        url: 'insights',
        baseApp: '/dashboard',
        apps: {
            dashboard: '/dashboard',
            patch: '/patch',
            advisor: '/advisor',
            drift: '/drift',
            vulnerability: '/vulnerability',
            policies: '/policies',
            compliance: '/compliance'
        },
        image: Insights,
        title: 'Red Hat Insights',
        emptyTitle: 'Red Hat Insights is included with every Red Hat Enterprise Linux subscription',
        emptyText: 'Proactively identify and remediate threats to security, performance, availability, \
        and stability with Red Hat Insights. Activate Red Hat Insights to get started today.',
        emptyID: 'insights',
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
        marketingUrls: {
            learnMore: 'https://try.openshift.com'
        },
        image: Openshift,
        emptyTitle: 'Get Started with Red Hat Openshift.',
        emptyID: 'openshift',
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
        image: Automation,
        title: 'Red Hat Ansible Automation Platform',
        body: 'Extend your automation with analytics, content management, and policy and governance.',
        apps: {
            'automation analytics': '/automation-analytics',
            'automation hub': '/automation-hub',
            'automation services catalog': '/catalog'
        },
        marketing: true,
        marketingImage: ansibleMarketing,
        marketingText: 'Extend your automation with analytics, policy and governance, and content management.',
        marketingUrls: {
            learnMore: 'http://ansible.com/products/automation-platform',
            tryIt: 'https://www.redhat.com/en/technologies/management/ansible/try-it'
        },
        emptyTitle: 'Ansible Automation Platform services requires a valid subscription',
        emptyText: 'Get analytics and knowledge on your automation, access to certified content, and more with a \
        Red Hat Ansible Automation Platform subscription.',
        emptyID: 'ansible',
        emptyAction: {
            // primary: {
            //     title: 'Request an evaluation',
            //     navigate: 'https://www.redhat.com/en/technologies/management/ansible/try-it'
            // },
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
        image: Cost,
        apps: {
            'cost management': '/'
        },
        emptyTitle: 'Cost Management for Red Hat OpenShift',
        emptyID: 'cost-management',
        emptyText: 'Cost Management provides visibility and analysis for your Red Hat OpenShift \
        and cloud costs. To obtain access to Cost Management, become a Red Hat OpenShift customer.',
        emptyAction: {
            primary: {
                title: 'Learn more',
                navigate: 'https://www.redhat.com/en/technologies/cloud-computing/openshift'
            },
            close: {
                title: 'Not now'
            }
        },
        title: 'Cost Management',
        body: 'Analyze, forecast and optimize your Red Hat OpenShift cluster costs in hybrid cloud environments.'
    },
    {
        id: 'migrations',
        entitlement: 'migrations',
        url: 'migrations',
        image: Migrations,
        title: 'Migration Services',
        body: 'Get recommendations on migrating your applications and infrastructure to Red Hat.',
        baseApp: '/migration-analytics',
        apps: {
            'migration analytics': '/migration-analytics'
        },
        marketing: false,
        emptyTitle: 'Migration Analytics requires a CloudForms subscription.',
        emptyID: 'migration-analytics',
        emptyText: 'Migration Analytics lets you examine workloads in your environment and evaluate \
        the effort needed to migrate or modernize each. Learn more to request a free CloudForms evaluation subscription',
        emptyAction: {
            primary: {
                title: 'Request an evaluation',
                navigate: 'https://access.redhat.com/products/red-hat-cloudforms-migrations/evaluation'
            },
            secondary: {
                title: 'Take a tour'
            },
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'subscriptions',
        entitlement: 'subscriptions',
        url: 'subscriptions',
        image: Subscriptions,
        title: 'Subscription Watch',
        body: 'Account-level summaries of your Red Hat subscription utilization',
        baseApp: '/rhel-sw',
        apps: {
            'Red Hat Enterprise Linux': '/rhel-sw',
            'Red Hat OpenShift': '/openshift-sw'
        },
        marketing: false,
        emptyTitle: 'Subscription Watch',
        emptyID: 'subscription-watch',
        emptyText: [
            'Subscription Watch enables you to understand your total subscription usage and capacity across your hybrid infrastructure over time.',
            <br key="sw1" />,
            <br key="sw2" />,
            'If you are interested in trying Subscription Watch, your Red Hat account team can help.'
        ],
        emptyAction: {
            primary: {
                title: 'Contact us',
                navigate: 'https://access.redhat.com/account-team'
            },
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'settings',
        entitlement: 'settings',
        url: 'settings',
        disabled: true,
        emptyAlertTitle: 'You need an account number to access this page'
    },
    {
        id: 'user-preferences',
        entitlement: 'user_preferences',
        url: 'user-preferences',
        disabled: true,
        emptyAlertTitle: 'You need an account number to access this page'
    }
];
