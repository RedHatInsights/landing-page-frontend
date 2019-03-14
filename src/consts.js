import openshift from './components/openshift.svg';
import hcm from './components/hcm.svg';
import insights from './components/insights.svg';
import rhelCs from './components/rhel-cs.svg';

export const activeTechnologies = [
    {
        name: 'insights',
        url: 'insights/actions',
        icon: insights,
        title: 'Red Hat Enterprise Linux management services',
        body: 'Predict Risk. Get guidance. Stay secure.'
    },
    {
        url: 'rhcs/dashboard',
        icon: rhelCs,
        title: 'Red Hat Enterprise Linux management services',
        body: 'Operate and protect your Red Hat plargorms.'
    },
    {
        url: 'uhc',
        icon: openshift,
        title: 'Red Hat OpenShift Cluster Manager',
        body: 'Manage your highly available public and private clouds.'
    },
    {
        url: 'hcm/service-portal',
        icon: hcm,
        title: 'Hybrid Cloud Management services',
        body: 'Govern and automate your hybrid infrastructure.',
        isPreview: true
    }
];
