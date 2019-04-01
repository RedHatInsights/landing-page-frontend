import { CloudCircleIcon, CloudServerIcon, ChartSpikeIcon, OpenshiftIcon } from '@patternfly/react-icons';

export const activeTechnologies = [
    {
        entitlement: 'insights',
        name: 'insights',
        id: 'insights',
        url: 'insights/actions',
        icon: ChartSpikeIcon,
        iconProps: {
            height: '3.5em',
            width: '3.5em'
        },
        title: 'Red Hat Insights',
        emptyTitle: 'Get Started with Red Hat Insights',
        emptyText: 'With predictive analytics, avoid problems and unplanned downtime in your \
        Red Hat environment. Red Hat Insights is included with your Red Hat Enterprise Linux Subscription.',
        emptyAction: {
            title: 'Try it free'
        },
        emptyProps: {
            width: '2em',
            height: '2em'
        },
        body: 'Predict Risk. Get guidance. Stay secure.'
    },
    {
        entitlement: 'smart_management',
        id: 'RHEL',
        url: 'rhel/dashboard',
        icon: CloudServerIcon,
        iconProps: {
            height: '3.5em',
            width: '5.5em',
            viewBox: '70 87 80 65'
        },
        emptyTitle: 'Do more with your Red Hat Enterprise Linux environment',
        emptyText: 'Upgrade to Smart Management to keep your Red Hat environmen running efficiently, \
        with security and compliant with various standards.',
        emptyAction: {
            title: 'Learn More'
        },
        emptyProps: {
            width: '3em',
            height: '2em'
        },
        title: 'Red Hat Enterprise Linux management services',
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
            },
            height: '3.5em',
            width: '3.5em'
        },
        emptyTitle: 'Get Started with Red Hat Openshift',
        emptyText: 'Test drive industry\'s leading container application platform in your browser, \
        and see how easy it is to use Kubernetes in your organization today.',
        emptyAction: {
            title: 'Try it free'
        },
        emptyProps: {
            width: '2em',
            height: '2em'
        },
        title: 'Red Hat OpenShift Cluster Manager',
        body: 'Manage your highly available public and private clouds.'
    },
    {
        id: 'Hybrid',
        url: 'hybrid/catalog',
        entitlement: 'hybrid_cloud',
        icon: CloudCircleIcon,
        iconProps: {
            height: '3.5em',
            width: '5.5em',
            viewBox: '70 87 80 65'
        },
        emptyProps: {
            width: '3em',
            height: '2em'
        },
        emptyTitle: 'Manage your hybrid environment',
        emptyText: 'Govern and automate your Red Hat environment across private and public clouds with \
        Red Hat Hybrid cloud managemnt.',
        emptyAction: {
            title: 'Learn More'
        },
        title: 'Hybrid cloud management services',
        body: 'Govern, automate, and manage multicloud environments.',
        isPreview: true
    }
];
