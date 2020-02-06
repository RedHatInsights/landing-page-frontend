import { ChartSpikeIcon } from '@patternfly/react-icons';
import subscriptions from '../components/subscriptions.svg';
import costManagement from '../components/cost-management.svg';

export const unentitledTechnologies = [
    {
        id: 'insights',
        entitlement: 'insights',
        icon: ChartSpikeIcon,
        emptyTitle: 'Red Hat Insights is included with every Red Hat Enterprise Linux subscription',
        emptyText: 'Proactively identify and remediate threats to security, performance, availability, \
        and stability with Red Hat Insights. Activate Red Hat Insights to get started today.',
        emptyAction: {
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
        emptyTitle: 'Get started with Cloud Management Services for Red Hat Enterprise Linux',
        emptyText: 'Monitor your Red Hat environments to track system compliance, configuration, \
        security, and efficiency. Upgrade to get started today.',
        emptyAction: {
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
        emptyTitle: 'Get Started with Red Hat Openshift.',
        emptyText: 'Test drive industry\'s leading container application platform in your browser, \
        and see how easy it is to use Kubernetes in your organization today.',
        emptyAction: {
            primary: {
                title: 'Try it free'
            }
        }
    },
    {
        id: 'Ansible',
        entitlement: 'ansible',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/ansible.svg`,
        emptyTitle: 'Get started with Ansible Automation Platform',
        emptyText: 'Get analytics and knowledge on your automation, access to certified content, and more with a \
        Red Hat Ansible Automation Platform subscription.',
        emptyAction: {
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
        emptyTitle: 'Cost Management technology preview access',
        emptyText: 'Cost Management technology preview is currently \
        restricted to Red Hat customers.',
        emptyAction: {
            primary: {
                title: 'Ok'
            }
        }
    },
    {
        id: 'migrations',
        entitlement: 'migrations',
        image: `${document.baseURI}apps/chrome/assets/images/platform-icons/migrations-namespace.svg`,
        emptyTitle: 'The Migration Service requires that you request an evaluation',
        emptyText: 'To obtain recommendations for your applications and infrastructure, you will need \
        to first analyze your environment using Red Hat CloudForms.',
        emptyAction: {
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
        emptyTitle: 'Subscription Watch',
        emptyText: 'Subscription Watch is an early access beta',
        emptyAction: {
            close: {
                title: 'Not now'
            }
        },
        isEarlyAccess: true
    }
];
