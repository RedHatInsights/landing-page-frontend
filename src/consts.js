import { ChartSpikeIcon, OpenshiftIcon } from '@patternfly/react-icons';
import hcm from './components/hcm.svg';
import rhelCs from './components/rhel-cs.svg';

export const activeTechnologies = [
    {
        entitlement: 'insights',
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
        body: 'Predict Risk. Get guidance. Stay secure.'
    },
    {
        entitlement: 'smart_management',
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
        body: 'Operate and protect your Red Hat platforms.'
    },
    {
        id: 'Openshift',
        url: 'openshift',
        entitlement: 'openshift',
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
        body: 'Manage your highly available public and private clouds.'
    },
    {
        id: 'Hybrid',
        url: 'hybrid/catalog',
        entitlement: 'hybrid_cloud',
        disabled: window.location.pathname.indexOf('/beta') !== 0,
        image: rhelCs,
        emptyTitle: 'Hybrid cloud management services Technology Preview access',
        emptyText: 'The Red Hat hybrid cloud management services Technology Preview is currently \
        restricted to Red Hat customers.',
        emptyAction: {
            title: 'Learn More'
        },
        title: 'Hybrid cloud management services',
        body: 'Govern, automate, and manage multicloud environments.',
        isPreview: true
    }
];
