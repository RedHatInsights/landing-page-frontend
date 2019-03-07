import { ChartLineIcon, ServerAltIcon, OutlinedCircleIcon, TopologyIcon } from '@patternfly/react-icons';

export const activeTechnologies = [
    {
        name: 'insights',
        url: 'advisor',
        icon: ChartLineIcon,
        title: 'Red Hat Insights',
        body: 'Predict Risk. Get guidance. Stay secure.'
    },
    {
        name: 'cloud-rhel',
        url: 'dashboard',
        icon: ServerAltIcon,
        title: 'Cloud Services for RHEL',
        body: 'Operate and protect your Red Hat plargorms.'
    },
    {
        name: 'openshift-cloud-manager',
        url: 'uhc',
        icon: OutlinedCircleIcon,
        iconProps: {
            style: {
                fill: '#DB242F'
            }
        },
        title: 'OpenShift Cluster Manager',
        body: 'Manage your highly available public and private clouds.'
    },
    {
        name: 'hybrid-cloud-management',
        url: 'service-portal',
        icon: TopologyIcon,
        title: 'Hybrid Cloud Management',
        body: 'Govern and automate your hybrid infrastructure.',
        isPreview: true
    }
];
