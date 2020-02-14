import insightsMarketing from '../components/marketing/insightsMarketing.svg';
import openShiftMarketing from '../components/marketing/openShiftMarketing.svg';
import smartManagementMarketing from '../components/marketing/smartManagementMarketing.svg';
import ansibleMarketing from '../components/marketing/ansibleMarketing.svg';

export const marketingTechnologies = [
    {
        title: 'Red Hat Insights',
        id: 'insights',
        image: insightsMarketing,
        description: 'Proactively identify and remediate threats to security, performance, and stability.',
        actions: {
            learnMore: 'https://www.redhat.com/en/technologies/management/insights'
        }
    },
    {
        title: 'Cloud Management Services for Red Hat Enterprise Linux',
        id: 'RHEL',
        image: smartManagementMarketing,
        description: 'Operate and protect your Red Hat platforms.',
        actions: {
            learnMore: 'https://www.redhat.com/en/technologies/management/smart-management'
        }
    },
    {
        title: 'Red Hat OpenShift Cluster Manager',
        id: 'Openshift',
        image: openShiftMarketing,
        description: 'Install, register, and manage Red Hat OpenShift® 4 clusters.',
        actions: {
            learnMore: 'https://try.openshift.com'
        }
    },
    {
        title: 'Red Hat Ansible Automation Platform',
        id: 'ansible',
        image: ansibleMarketing,
        description: 'Extend your automation with analytics, policy and governance, and content management.',
        actions: {
            learnMore: 'http://ansible.com/products/automation-platform',
            tryIt: 'https://www.redhat.com/en/technologies/management/ansible/try-it'
        }
    }
];
