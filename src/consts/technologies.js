import PlatformsAndManagement from '../components/images/platformsAndManagement.svg';
import AnsibleAutomation from '../components/images/ansibleAutomation.svg';
import ITOptimization from '../components/images/itOptimization.svg';

// disabled works on top level categories as well as inside of the apps object

export const activeTechnologies = [
    {
        id: 'platforms-and-management',
        title: 'Platforms and Management',
        description: 'this is a description for platforms and management',
        image: PlatformsAndManagement,
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
                id: 'custom-policies',
                name: 'Custom Policies',
                url: '#'
            },
            {
                id: 'drift',
                name: 'Drift Analysis',
                url: 'rhel/drift'
            },
            {
                id: 'openshift-clusters',
                name: 'OpenShift Clusters',
                url: 'openshift'
            },
            {
                id: 'remediations',
                name: 'Remediations',
                url: 'insights/remediations'
            },
            {
                id: 'subscriptions',
                name: 'Subscriptions',
                url: 'subscriptions/rhel-sw'
            },
            {
                id: 'system-patching',
                name: 'System Patching',
                url: '#'
            },
            {
                id: 'vulnerability',
                name: 'Vulnerability',
                url: 'rhel/vulnerability'
            }
        ]
    },
    {
        id: 'ansible-automation',
        title: 'Ansible Automation',
        description: 'this is a description for ansible automation',
        image: AnsibleAutomation,
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
        id: 'IT-optimization',
        title: 'IT Optimization',
        description: 'this is a description for IT optimization',
        image: ITOptimization,
        apps: [
            {
                id: 'migration-services',
                name: 'Migration Services',
                url: 'migrations'
            }
        ]
    }
];
