import openshift from './components/openshift.svg';
import hcm from './components/hcm.svg';
import insights from './components/insights.svg';
import rhelCs from './components/rhel-cs.svg';

export const activeTechnologies = [
    {
        name: 'insights',
        url: 'insights',
        icon: insights,
        title: 'Red Hat Insights',
        body: 'Predict Risk. Get guidance. Stay secure.'
    },
    {
        name: 'cloud-rhel',
        url: 'rhcs/dashboard',
        icon: rhelCs,
        title: 'Red Hat Enterprise Linux management services',
        body: 'Operate and protect your Red Hat plargorms.'
    },
    {
        name: 'openshift-cloud-manager',
        url: 'uhc',
        icon: openshift,
        title: 'Red Hat OpenShift Cluster Manager',
        body: 'Manage your highly available public and private clouds.'
    },
    {
        name: 'hybrid-cloud-management',
        url: 'service-portal',
        icon: hcm,
        title: 'Hybrid Cloud Management services',
        body: 'Govern and automate your hybrid infrastructure.',
        isPreview: true
    }
];
