import React from 'react';
import Subscriptions from './components/Subscriptions.svg';
import Cost from './components/Cost.svg';
import Insights from './components/Insights.svg';
import SAP from './components/SAP.svg';
import Automation from './components/Automation.svg';

export const activeTechnologies = [
  {
    entitlement: 'openShiftAppServices',
    name: 'openShiftAppServices',
    id: 'openShiftAppServices',
    url: 'openShiftAppServices',
    baseApp: '/openShiftAppServices',
    apps: {
      dashboard: '/dashboard',
    },
    title: 'Red Hat Enterprise Linux',
    body: '',
  },
  {
    entitlement: 'ansible',
    name: 'ansibleAutomation',
    id: 'ansibleAutomation',
    url: 'ansibleAutomation',
    baseApp: '/ansibleAutomation',
    apps: {
      dashboard: '/dashboard',
    },
    title: 'Ansible Automation',
    body: '',
    image: Automation,
    emptyTitle: 'Get started with Red Hat Ansible Automation Platform',
    emptyText: [
      'Red Hat Ansible Automation Platform simplifies the development and operation of automation workloads across diverse hybrid environments using Ansible Automation Controller, certified and supported content collections, and the hosted services on cloud.redhat.com.',
    ],
    emptyID: 'ansible',
    emptyAction: {
      primary: {
        title: 'Try it',
        navigate:
          'https://www.redhat.com/en/technologies/management/ansible/try-it',
      },
      secondary: {
        navigate:
          'https://www.ansible.com/products/automation-platform?extIdCarryOver=true&intcmp=701f20000012m1qAAA&sc_cid=701f2000001Css0AAC',
      },
      close: {
        title: 'Not now',
      },
    },
  },
  {
    featured: true,
    entitlement: 'insights',
    name: 'insights',
    id: 'insights',
    url: 'insights',
    baseApp: '/dashboard',
    apps: {
      dashboard: '/dashboard',
      patch: '/patch',
      advisor: '/advisor',
      drift: '/drift',
      vulnerability: '/vulnerability',
      policies: '/policies',
      compliance: '/compliance',
    },
    image: Insights,
    title: 'Insights',
    emptyTitle:
      'Red Hat Insights is included with your Red Hat Enterprise Linux subscription.',
    emptyText: [
      'Red Hat Insights for Red Hat Enterprise Linux simplifies how IT teams maintain and optimize a stable, secure, and performant operating environment.',
      <br key="insights-space1" />,
      <br key="insights-space2" />,
      'This is done by visualizing subscription and resource utilization of RHEL, and using powerful rule-based analytical models to proactively \
       identify and prioritize operational and security risks so teams can take action faster and easier.',
      <br key="insights-space3" />,
      <br key="insights-space4" />,
      'Start your trial today.',
    ],
    emptyID: 'insights',
    emptyAction: {
      primary: {
        title: 'Request a trial',
        navigate:
          'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/try-it',
      },
      secondary: {
        navigate:
          'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux',
      },
      close: {
        title: 'Not now',
      },
    },
    body: 'Identify and remediate configuration issues in your Red Hat® environments.',
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__private-cloud.svg',
    id: 'infrastructure',
    title: 'No infrastructure required',
    text: (
      <p>
        Get started quickly, simplifying operations and decreasing time-to-value
        from on-premise to the cloud.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__update.svg',
    id: 'continuous-upgrades',
    title: 'Continuous upgrades',
    text: (
      <p>
        The managed and hosted services in the Red Hat hybrid cloud console get
        updated frequently to bring the latest benefits to you and your team.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__build-deploy.svg',
    id: 'build-deploy',
    title: 'Build and deploy',
    text: (
      <p>
        Create and install your Red Hat OpenShift 4 clusters, or Red Hat
        Enterprise Linux images (available in{' '}
        <a
          href={`${window.location.origin}/beta`}
          target="_blank"
          rel="noreferrer"
        >
          Beta
        </a>
        ), directly to your public cloud or on-premise environment to ensure a
        more secure and stable foundation.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__control-panel.svg',
    id: 'zero-install',
    title: 'Zero install',
    text: (
      <p>
        Red Hat platforms are engineered to connect and access critical updates
        and analytics from Red Hat—while giving you control over what gets
        shared.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__hybrid-cloud.svg',
    id: 'open-hybrid-cloud',
    title: 'Decades of open hybrid cloud experience',
    text: (
      <p>
        No other technology partner offers the level of technology, flexibility,
        and support to empower developers and IT teams to build, deploy, and
        migrate applications as they see fit.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__exp-up.svg',
    id: 'insights',
    title: 'Insights to action',
    text: (
      <p>
        Integrated throughout, Red Hat Insights uses unique rule-based
        analytical models to visualize system health and utilization in your
        hybrid cloud environments, while providing targeted actions to improve
        security, stability, and ROI.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__padlock.svg',
    id: 'customers',
    title: 'Exclusively for Red Hat customers',
    text: (
      <p>
        Access services today with just a Red Hat account. Unlock
        transformational benefits when your host systems are connected back to
        Red Hat hybrid cloud console.
      </p>
    ),
  },
  {
    keyFeature: true,
    icon: 'https://cloud.redhat.com/apps/frontend-assets/icons/icon__modernize.svg',
    id: 'modernize',
    title: 'Modernize your application development',
    text: (
      <p>
        Deliver applications faster with Red Hat application and data services.
        Use analytics services to automate the discovery and remediation of
        risks and misconfigurations in operating environments.
      </p>
    ),
  },
  {
    id: 'subscriptions',
    entitlement: 'subscriptions',
    url: 'subscriptions',
    image: Subscriptions,
    title: 'Subscriptions',
    body: 'Account-level summaries of your Red Hat subscription utilization',
    baseApp: '/rhel-sw',
    apps: {
      'Red Hat Enterprise Linux': '/rhel-sw',
      OpenShift: '/openshift-sw',
    },
    emptyTitle: 'Subscriptions',
    emptyID: 'subscription-watch',
    emptyText: [
      'Subscriptions enables you to understand your total subscription usage and capacity across your hybrid infrastructure over time.',
      <br key="sw1" />,
      <br key="sw2" />,
      'If you are interested in trying Subscriptions, your Red Hat account team can help.',
    ],
    emptyAction: {
      primary: {
        title: 'Contact us',
        navigate: 'https://access.redhat.com/account-team',
      },
      close: {
        title: 'Not now',
      },
    },
  },
  {
    id: 'sap',
    url: 'insights',
    baseApp: '/sap',
    entitlement: 'insights',
    image: SAP,
    apps: {
      dashboard: '/sap',
    },
    title: 'Insights for SAP',
    body: 'Leverage Insights to manage, optimize and remediate risks to your SAP landscape.',
  },
  {
    id: 'Cost Management',
    url: 'cost-management',
    baseApp: '/',
    entitlement: 'cost_management',
    image: Cost,
    apps: {
      'cost management': '/',
    },
    emptyTitle: 'Cost Management for OpenShift',
    emptyID: 'cost-management',
    emptyText:
      'Cost Management provides visibility and analysis for your OpenShift \
        and cloud costs. To obtain access to Cost Management, become an OpenShift customer.',
    emptyAction: {
      primary: {
        title: 'Learn more',
        navigate:
          'https://www.redhat.com/en/technologies/cloud-computing/openshift',
      },
      close: {
        title: 'Not now',
      },
    },
    title: 'Cost Management',
    body: 'Analyze, forecast and optimize your OpenShift cluster costs in hybrid cloud environments.',
  },
  {
    id: 'settings',
    entitlement: 'settings',
    url: 'settings',
    disabled: true,
    emptyAlertTitle: 'You need an account number to access this page',
  },
  {
    id: 'user-preferences',
    entitlement: 'user_preferences',
    url: 'user-preferences',
    disabled: true,
    emptyAlertTitle: 'You need an account number to access this page',
  },
  {
    id: 'internal',
    entitlement: 'internal',
    url: 'internal',
    disabled: true,
    emptyAlertTitle: 'You do not have access to this page',
  },
];
