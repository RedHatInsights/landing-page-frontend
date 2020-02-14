import { ChartSpikeIcon } from '@patternfly/react-icons';
import subscriptions from '../components/images/subscriptions.svg';
import costManagement from '../components/images/cost-management.svg';

export const unentitledTechnologies = [
    {
        id: 'insights',
        entitlement: 'insights',
        icon: ChartSpikeIcon,
        title: 'Red Hat Insights is included with every Red Hat Enterprise Linux subscription',
        description: 'Proactively identify and remediate threats to security, performance, availability, \
        and stability with Red Hat Insights. Activate Red Hat Insights to get started today.',
        actions: {
            primary: {
                title: 'Get started',
                navigate: 'https://www.redhat.com/wapps/eval/index.html?evaluation_id=1036'
            },
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'rhel',
        entitlement: 'smart_management',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/rhel-cs-namespace.svg`,
        title: 'Get started with Cloud Management Services for Red Hat Enterprise Linux',
        description: 'Monitor your Red Hat environments to track system compliance, configuration, \
        security, and efficiency. Upgrade to get started today.',
        actions: {
            primary: {
                title: 'Request an evaluation',
                navigate: 'https://access.redhat.com/products/cloud_management_services_for_rhel/evaluation'
            },
            secondary: {
                title: 'Learn more',
                navigate: 'https://access.redhat.com/products/cloud_management_services_for_rhel'
            },
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'Openshift',
        entitlement: 'openshift',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/openshift.svg`,
        title: 'Get Started with Red Hat Openshift.',
        description: 'Test drive industry\'s leading container application platform in your browser, \
        and see how easy it is to use Kubernetes in your organization today.',
        actions: {
            primary: {
                title: 'Try it free'
            }
        }
    },
    {
        id: 'Ansible',
        entitlement: 'ansible',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/ansible.svg`,
        title: 'Get started with Ansible Automation Platform',
        description: 'Get analytics and knowledge on your automation, access to certified content, and more with a \
        Red Hat Ansible Automation Platform subscription.',
        actions: {
            primary: {
                title: 'Request an evaluation',
                navigate: 'https://www.redhat.com/en/technologies/management/ansible/try-it'
            },
            secondary: {
                title: 'Learn more',
                navigate: 'https://www.ansible.com/products/automation-platform'
            },
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'cost-management',
        entitlement: 'cost_management',
        image: costManagement,
        title: 'Cost Management technology preview access',
        description: 'Cost Management technology preview is currently \
        restricted to Red Hat customers.',
        actions: {
            primary: {
                title: 'Ok'
            }
        }
    },
    {
        id: 'migrations',
        entitlement: 'migrations',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/migrations-namespace.svg`,
        title: 'The Migration Service requires that you request an evaluation',
        description: 'To obtain recommendations for your applications and infrastructure, you will need \
        to first analyze your environment using Red Hat CloudForms.',
        actions: {
            // title: 'Request an evaluation',
            // navigate: 'todo',
            close: {
                title: 'Not now'
            }
        }
    },
    {
        id: 'subscriptions',
        entitlement: 'subscriptions',
        image: subscriptions,
        title: 'Subscription Watch',
        description: 'Subscription Watch is an early access beta',
        actions: {
            close: {
                title: 'Not now'
            }
        },
        isEarlyAccess: true
    }
];
