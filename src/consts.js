import { ChartSpikeIcon, OpenshiftIcon } from '@patternfly/react-icons';
import hcm from './components/hcm.svg';
import rhelCs from './components/rhel-cs.svg';

import insightsMarketing from './components/marketing/insightsMarketing.svg';
import openShiftMarketing from './components/marketing/openShiftMarketing.svg';
import smartManagementMarketing from './components/marketing/smartManagementMarketing.svg';

export const activeTechnologies = [
    {
        entitlement: 'insights',
        marketing: true,
        marketingImage: insightsMarketing,
        marketingText: 'Proactively identify and remediate threats to security, performance, and stability',
        marketingUrl: 'https://access.redhat.com/products/red-hat-insights#getstarted',
        name: 'insights',
        id: 'insights',
        url: 'insights/actions',
        icon: ChartSpikeIcon,
        title: 'Red Hat Insights',
        emptyTitle: 'Red Hat Insights is included with every Red Hat Enterprise Linux subscription',
        emptyText: 'Proactively identify and remediate threats to security, performance, availability, \
        and stability with Red Hat Insights. Begin a free evaluation of Red Hat Enterprise Linux to get started today.',
        emptyAction: {
            title: 'Try it free'
        },
        body: 'Identify and remediate configuration issues in your Red Hat environments.'
    },
    {
        entitlement: 'smart_management',
        marketing: true,
        marketingImage: smartManagementMarketing,
        marketingText: 'Operate and protect your Red Hat platforms',
        marketingUrl: 'https://access.redhat.com/products/cloud_management_services_for_red_hat_enterprise_linux/#getstarted',
        id: 'RHEL',
        url: 'rhel/dashboard',
        image: hcm,
        emptyTitle: 'Upgrade to get started with cloud management services for Red Hat Enterprise Linux',
        emptyText: 'Monitor your Red Hat environments to track system compliance, configuration, \
        security, and efficiency. Upgrade to get started today.',
        emptyAction: {
            title: 'Learn More',
            navigate: 'https://www.redhat.com/en/technologies/management/smart-management'
        },
        title: 'Cloud Management Services for Red Hat Enterprise Linux',
        body: 'Monitor and manage issues like security and compliance for your Red Hat Enterprise Linux systems.'
    },
    {
        id: 'Openshift',
        url: 'openshift',
        entitlement: 'openshift',
        marketing: true,
        marketingImage: openShiftMarketing,
        marketingText: 'Install, register, and manage OpenShift 4 clusters',
        marketingUrl: 'https://try.openshift.com/',
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
        body: 'Install, register, and manage OpenShift 4 clusters.'
    },
    {
        id: 'Hybrid',
        url: 'hybrid/catalog',
        entitlement: 'hybrid_cloud',
        marketing: false,
        disabled: window.location.pathname.indexOf('/beta') !== 0,
        image: rhelCs,
        emptyTitle: 'Hybrid cloud management services Technology Preview access',
        emptyText: 'The Red Hat hybrid cloud management services Technology Preview is currently \
        restricted to Red Hat customers.',
        emptyAction: {
            title: 'Learn More'
        },
        title: 'Hybrid cloud management services',
        body: 'Govern, automate, and manage multi-cloud environments.',
        isPreview: true
    }
];
