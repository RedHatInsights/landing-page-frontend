import hybridCloud from '../components/images/hybridCloud.svg';
import automation from '../components/images/automation.svg';
import agile from '../components/images/agile.svg';
import cloudNative from '../components/images/cloudNative.svg';

// disabled works on top level categories as well as inside of the apps object

const disableOnStable = window.location.pathname.indexOf('/beta') !== 0;

export const activeTechnologies = [
    {
        id: 'hybrid-cloud-infrastructure',
        title: 'Hybrid-cloud infrastructure',
        description: 'Prescriptive and predictive analytics and remediation for your Linux and container environments.',
        image: hybridCloud,
        apps: [
            {
                id: 'insights-dashboard',
                name: 'Insights dashboard',
                url: 'insights/dashboard'
            },
            {
                id: 'advisor',
                name: 'Advisor',
                url: 'insights/advisor'
            },
            {
                id: 'compliance',
                name: 'Compliance',
                url: 'rhel/compliance'
            },
            {
                id: 'vulnerability',
                name: 'Vulnerability',
                url: 'rhel/vulnerability'
            },
            {
                id: 'system-patching',
                name: 'System Patching',
                url: 'rhel/patch'
            },
            {
                id: 'custom-policies',
                name: 'Custom Policies',
                url: '#',
                disabled: true
            },
            {
                id: 'drift',
                name: 'Drift Analysis',
                url: 'rhel/drift'
            },
            {
                id: 'remediations',
                name: 'CVE Remediation',
                url: 'insights/remediations'
            },
            {
                id: 'migration-services',
                disabled: disableOnStable,
                name: 'Migration Services',
                url: 'migrations'
            }
        ]
    },
    {
        id: 'cloud-native-development',
        title: 'Cloud Native Development',
        description: 'Optimize the cost and performance of your OpenShift applications running in any cloud.',
        image: cloudNative,
        apps: [
            {
                id: 'cost-management',
                name: 'Cost Management',
                url: 'cost-management'
            },
            {
                id: 'openshift-cluster-manager',
                name: 'OpenShift Cluster Manager',
                url: 'openshift'
            },
            {
                id: 'migration-services',
                name: 'Migration Services',
                url: 'migrations/migration-analytics'
            }
        ]
    },
    {
        id: 'automation',
        title: 'Automation',
        description: 'Gain end-to-end visibility and quicker time to value for critical, repetitive IT operations.',
        image: automation,
        apps: [
            {
                id: 'automation-analytics',
                name: 'Automation Analytics',
                url: 'ansible/analytics'
            },
            {
                id: 'automation-hub',
                name: 'Automation Hub & Partner Certified Content',
                url: 'ansible/hub'
            },
            {
                id: 'service-catalog',
                name: 'Automation Service Catalog',
                url: 'ansible/catalog'
            }
        ]
    },
    {
        id: 'subscription-services',
        title: 'Subscription Services',
        description: 'Efficiently manage your Red Hat subscriptions with confidence.',
        image: agile,
        apps: [
            {
                id: 'subscription-watch',
                name: 'Subscription Watch',
                url: 'subscriptions/rhel-sw'
            }
        ]
    }
];
