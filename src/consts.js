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
        emptyTitle: 'Get Started with Red Hat Insights',
        emptyText: 'With predictive analytics, avoid problems and unplanned downtime in your \
        Red Hat environment. Red Hat Insights is included with your Red Hat Enterprise Linux Subscription.',
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
        emptyTitle: 'Do more with your Red Hat Enterprise Linux environment',
        emptyText: 'Upgrade to Smart Management to keep your Red Hat environment running efficiently, \
        with security and compliant with various standards.',
        emptyAction: {
            title: 'Learn More',
            navigate: 'https://www.redhat.com/en/technologies/management/smart-management'
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
