import PlatformsAndManagement from '../components/images/platformsAndManagement.svg';
import AnsibleAutomation from '../components/images/ansibleAutomation.svg';
import ITOptimization from '../components/images/itOptimization.svg';

// TODO make apps show unentitled modal

export const activeTechnologies = [
    {
        entitlement: 'insights',
        title: 'Platforms and Management',
        description: 'this is a description for platforms and management',
        icon: PlatformsAndManagement,
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
                url: 'insights/compliance'
            },
            {
                id: 'custom-policies',
                name: 'Custom Policies',
                url: 'TODO'
            },
            {
                id: 'drift',
                name: 'Drift Analysis',
                url: 'insights/drift'
            },
            {
                id: 'openshift-clusters',
                name: 'OpenShift Clusters',
                url: 'TODO'
            },
            {
                id: 'remediations',
                name: 'Remediations',
                url: 'insights/remediations'
            },
            {
                id: 'subscriptions',
                name: 'Subscriptions',
                url: 'TODO'
            },
            {
                id: 'system-patching',
                name: 'System Patching',
                url: 'TODO'
            },
            {
                id: 'vulnerability',
                name: 'Vulnerability',
                url: 'insights/vulnerability'
            }
        ]
    },
    {
        entitlement: 'ansible',
        title: 'Ansible Automation',
        description: 'this is a description for ansible automation',
        icon: AnsibleAutomation,
        apps: [
            {
                id: 'automation-analytics',
                name: 'Automation Analytics',
                url: 'ansible/analytics'
            },
            {
                id: 'automation-hub',
                name: 'Automation Hub',
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
        entitlement: 'migrations',
        title: 'IT Optimization',
        description: 'this is a description for IT optimization',
        icon: ITOptimization,
        apps: [
            {
                id: 'migration-services',
                name: 'Migration Services',
                url: 'migrations'
            }
        ]
    }
];
