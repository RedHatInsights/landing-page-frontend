import insightsMarketing from '../components/marketing/insightsMarketing.svg';
import openShiftMarketing from '../components/marketing/openShiftMarketing.svg';
import smartManagementMarketing from '../components/marketing/smartManagementMarketing.svg';
import ansibleMarketing from '../components/marketing/ansibleMarketing.svg';

export const marketingTechnologies = [
    {
        title: 'Red Hat Insights',
        id: 'insights',
        marketingImage: insightsMarketing,
        marketingText: 'Proactively identify and remediate threats to security, performance, and stability.',
        marketingUrls: {
            learnMore: 'https://www.redhat.com/en/technologies/management/insights'
        }
    },
    {
        title: 'Cloud Management Services for Red Hat Enterprise Linux',
        id: 'RHEL',
        marketingImage: smartManagementMarketing,
        marketingText: 'Operate and protect your Red Hat platforms.',
        marketingUrls: {
            learnMore: 'https://www.redhat.com/en/technologies/management/smart-management'
        }
    },
    {
        title: 'Red Hat OpenShift Cluster Manager',
        id: 'Openshift',
        marketingImage: openShiftMarketing,
        marketingText: 'Install, register, and manage Red Hat OpenShift® 4 clusters.',
        marketingUrls: {
            learnMore: 'https://try.openshift.com'
        }
    },
    {
        title: 'Red Hat Ansible Automation Platform',
        id: 'ansible',
        marketingImage: ansibleMarketing,
        marketingText: 'Extend your automation with analytics, policy and governance, and content management.',
        marketingUrls: {
            learnMore: 'http://ansible.com/products/automation-platform',
            tryIt: 'https://www.redhat.com/en/technologies/management/ansible/try-it'
        }
    }
];
