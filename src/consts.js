import { ChartSpikeIcon, OpenshiftIcon } from '@patternfly/react-icons';
import hcm from './components/hcm.svg';
import rhelCs from './components/rhel-cs.svg';
import ansible from './components/ansible.svg';
import subscriptions from './components/subscriptions.svg';
import migrations from './components/migrations.svg';

import insightsMarketing from './components/marketing/insightsMarketing.svg';
import openShiftMarketing from './components/marketing/openShiftMarketing.svg';
import smartManagementMarketing from './components/marketing/smartManagementMarketing.svg';
import ansibleMarketing from './components/marketing/ansibleMarketing.svg';

// isDevPreview for developer previews
// isPreview for technical previews

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
        emptyTitle: 'Red Hat Insights is included with every Red Hat Enterprise Linux subscription.',
        emptyText: 'Proactively identify and remediate threats to security, performance, availability, \
        and stability with Red Hat Insights. Activate Red Hat Insights to get started today.',
        emptyAction: {
            title: 'Get started',
            navigate: 'https://www.redhat.com/wapps/eval/index.html?evaluation_id=1036',
            close: 'Not now'
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
            'system comparison': '/drift'
        },
        image: hcm,
        emptyTitle: 'Upgrade to get started with Cloud Management Services for Red Hat Enterprise Linux',
        emptyText: 'Monitor your Red Hat environments to track system compliance, configration, \
        security, and efficiency. Upgrade to get started today.',
        emptyAction: {
            title: 'Learn More',
            navigate: 'https://www.redhat.com/en/technologies/management/smart-management',
            close: 'Not now'
        },
        title: 'Cloud Management Services for Red Hat Enterprise Linux',
        body: 'Monitor and manage issues for your Red Hat Enterprise Systems.'
    },
    {
        id: 'Openshift',
        url: 'openshift',
        baseApp: '/clusters',
        apps: {
            'cluster manager': '/clusters'
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
            title: 'Try it free'
        },
        title: 'Red Hat OpenShift Cluster Manager',
        body: 'Install, register, and manage Red Hat OpenShift® 4 clusters.'
    },
    {
        id: 'Hybrid',
        url: 'hybrid',
        baseApp: '/catalog',
        entitlement: 'hybrid_cloud',
        marketing: false,
        disabled: window.location.pathname.indexOf('/beta') !== 0,
        image: rhelCs,
        emptyTitle: 'Hybrid Cloud Management Services Technology Preview access',
        emptyText: 'The Red Hat Hybrid Cloud Management Services technology preview is currently \
        restricted to Red Hat customers.',
        emptyAction: {
            title: 'Ok'
        },
        title: 'Hybrid Cloud Management Services',
        body: 'Govern, automate, and manage multi-cloud environments.',
        isPreview: true
    },
    {
        id: 'Ansible',
        disabled: true,
        entitlement: 'ansible',
        url: 'ansible-automation',
        baseApp: '/tower-analytics',
        image: ansible,
        title: 'Ansible Automation',
        body: 'todo',
        apps: {
            'automation analytics': '/tower-analytics',
            'automation hub': '/automation-hub',
            'playbook catalog': '/playbook-catalog'
        },
        marketing: true,
        marketingImage: ansibleMarketing,
        marketingText: 'todo',
        marketingUrl: 'todo',
        emptyTitle: 'Ansible Automation',
        emptyText: 'todo',
        emptyAction: {
            title: 'Learn More',
            navigate: 'todo'
        }
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
        emptyTitle: 'The Migration Service requires that you request an evaluation.',
        emptyText: 'To obtain recommendations for your applications and infrastructure, you will need \
        to first analyze your environment using Red Hat CloudForms.',
        emptyAction: {
            title: 'Request an evaluation',
            navigate: 'todo',
            close: 'Not now'
        },
        isPreview: true
    },
    {
        id: 'subscriptions',
        disabled: true,
        entitlement: 'subscriptions',
        url: 'subscriptions',
        image: subscriptions,
        title: 'Subscription Reporting',
        body: 'todo',
        baseApp: '/subscriptions',
        apps: {
            'subscription reporting': '/'
        },
        marketing: false,
        emptyTitle: 'Subscription Reporting',
        emptyText: 'Subscription Reporting requires a valid cloud.redhat.com account',
        emptyAction: {
            title: 'Activate Subscription Reporting',
            navigate: 'https://www.redhat.com/wapps/eval/index.html?evaluation_id=1036'
        }
    }
];
