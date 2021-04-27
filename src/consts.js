import React from 'react';
import Subscriptions from './components/Subscriptions.svg';
import Cost from './components/Cost.svg';
import Insights from './components/Insights.svg';
import SAP from './components/SAP.svg';
import Automation from './components/Automation.svg';
import { Button, CardFooter, Flex, FlexItem } from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons';
import imgModalPlaceholder from './layout/images/img__modal-placeholder.png';

export const productGridHeader = 'Build your cloud on open source';
export const productGridLoginText = 'Log in to the console';
export const productGridInfoText = 'More info';
export const productGridModalDataSheetText = 'View datasheet';
export const productGridModalMoreInfo = 'More information';
export const productGridModalCTAText = 'Try it now';

export const heroContent = {
  title: 'Build, deploy, and optimize your hybrid cloud',
  subTitle:
    'Access Red Hat’s managed applications and hosted services from the hybrid cloud console',
  primaryCTAtext: 'Log in to your account',
  secondaryCTAtext: 'Create an account',
  secondaryCTAurl: 'https://www.redhat.com/en/customers',
};

export const productDetail = {
  title: 'What is cloud.redhat.com?',
  content:
    'From deploying hybrid cloud platforms, ongoing monitoring and lifecycle management, as well as certified automation collections content, cloud.redhat.com provides content, tooling, and visibility across your hybrid cloud.',
};

export const keyFeatures = {
  title: 'Why Red Hat?',
};

export const getStarted = {
  title: 'Get started',
  ctaText: 'Log in to your account',
};

export const activeTechnologies = [
  {
    marketing: true,
    entitlement: 'openShiftAppServices',
    marketingImage:
      'https://cloud.redhat.com/apps/frontend-assets/logos/logo__osas.svg',
    marketingTitle: 'With cloud.redhat.com you can:',
    marketingContent: (
      <ul>
        <li>
          Capture, process, and stream real-time data across hybrid cloud
          environments.
        </li>
        <li>
          Rapidly develop, train, and test containerized machine learning models
          in the public cloud before deploying in production.
        </li>
        <li>
          Take an API-first approach to building microservices-based
          applications.
        </li>
      </ul>
    ),
    marketingUrls: {
      login: '/application-services/overview',
    },
    modalTitle: 'What are Red Hat OpenShift Application Services?',
    modalText:
      'Red Hat OpenShift Application Services deliver a streamlined developer experience for building, deploying, and scaling cloud-native applications.',
    modalImg: imgModalPlaceholder,
    modalUrls: {
      moreInfo: 'https://www.openshift.com/products/application-services',
    },
    name: 'openShiftAppServices',
    id: 'openShiftAppServices',
    url: 'openShiftAppServices',
    baseApp: '/openShiftAppServices',
    apps: {
      dashboard: '/dashboard',
    },
    title: 'OpenShift Application Services',
    body: '',
  },
  {
    marketing: true,
    entitlement: 'openShift',
    marketingImage:
      'https://cloud.redhat.com/apps/frontend-assets/logos/logo__openshift.svg',
    marketingTitle: 'With cloud.redhat.com you can:',
    marketingContent: (
      <ul>
        <li>
          Streamline and simplify how operators create, register, and upgrade
          Red Hat OpenShift 4 clusters.
        </li>
        <li>
          Monitor for configuration risks, upgrade compatibility, and cost
          optimization with Red Hat Insights.
        </li>
        <li>
          Track, on one screen, utilization of your annual Red Hat OpenShift
          Container Platform subscriptions and usage of hourly, pay-as-you-go
          subscriptions for both OpenShift Container Platform and Red Hat
          OpenShift Dedicated.
        </li>
      </ul>
    ),
    marketingUrls: {
      login: '/openshift/overview',
    },
    modalTitle: 'What is Red Hat OpenShift?',
    modalText:
      'An enterprise Kubernetes container platform with full-stack automated operations to manage hybrid cloud and multicloud deployments. Access to Red Hat Insights for Red Hat OpenShift is included.',
    modalImg: imgModalPlaceholder,
    modalUrls: {
      tryNow:
        'https://www.redhat.com/en/technologies/cloud-computing/openshift/try-it',
      dataSheet:
        'https://www.redhat.com/en/resources/openshift-container-platform-datasheet',
    },
    name: 'openShift',
    id: 'openShift',
    url: 'openShift',
    baseApp: '/openShift',
    apps: {
      dashboard: '/dashboard',
    },
    title: 'OpenShift',
    body: '',
  },
  {
    marketing: true,
    entitlement: 'rhel',
    marketingImage:
      'https://cloud.redhat.com/apps/frontend-assets/logos/logo__rhel.svg',
    marketingTitle: 'With cloud.redhat.com you can:',
    marketingContent: (
      <ul>
        <li>
          Operate confidently with system-level visibility into how Red Hat
          Enterprise Linux systems are built, configured, and compliant with
          security policies and business terms with Red Hat Insights.
        </li>
        <li>
          See an account-level view of subscription utilization over time.
        </li>
        <li>
          Assemble and customize Red Hat Enterprise Linux OS images to simplify
          system provisioning (in Beta).
        </li>
      </ul>
    ),
    marketingUrls: {
      login: '/insights/overview',
    },
    modalTitle: 'What is Red Hat Enterprise Linux?',
    modalText:
      'The leading enterprise LinuxⓇ operating system, certified on hundreds of clouds and with thousands of hardware vendors. Access to Red Hat Insights for Red Hat Enterprise Linux is included.',
    modalImg: imgModalPlaceholder,
    modalUrls: {
      tryNow:
        'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/try-it',
      dataSheet:
        'https://www.redhat.com/en/resources/red-hat-enterprise-linux-8-datasheet',
    },
    name: 'rhel',
    id: 'rhel',
    url: 'rhel',
    baseApp: '/rhel',
    apps: {
      dashboard: '/dashboard',
    },
    title: 'Red Hat Enterprise Linux',
    body: '',
  },
  {
    marketing: true,
    entitlement: 'ansible',
    marketingImage:
      'https://cloud.redhat.com/apps/frontend-assets/logos/logo__ansible-automation.svg',
    marketingTitle: 'With cloud.redhat.com you can:',
    marketingContent: (
      <ul>
        <li>
          Download all Ansible Content Collections that are supported by Red Hat
          and our certified partners.
        </li>
        <li>
          Delegate resources and make automation available at a faster pace to
          the appropriate teams.
        </li>
        <li>
          Analyze, aggregate, and report out on automation running in your
          infrastructure with Red Hat Insights.
        </li>
      </ul>
    ),
    marketingUrls: {
      login: '/ansible/overview',
    },
    modalTitle: 'What is Red Hat Ansible Automation Platform?',
    modalText:
      'A platform for implementing enterprise-wide automation using a simple to understand automation language. Access to Red Hat Insights for Red Hat Ansible Automation Platform is included.',
    modalImg: imgModalPlaceholder,
    modalUrls: {
      tryNow:
        'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/try-it',
      dataSheet:
        'https://www.redhat.com/en/resources/ansible-automation-platform-datasheet',
    },
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
    emptyTitle:
      'Ansible Automation Platform services requires a valid subscription',
    emptyText: [
      'Get analytics and knowledge of your automation, access to certified content, and more with a Red hat Ansible Automation Platform subscription.',
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
    marketing: true,
    featured: true,
    entitlement: 'insights',
    marketingImage:
      'https://cloud.redhat.com/apps/frontend-assets/logos/logo__insights.svg',
    marketingTitle: 'Red Hat Insights is expanding',
    marketingTitleSecondary: 'What is Insights?',
    marketingContent: (
      <p>
        Red Hat Insights reduces the operational complexity and effort to
        improve security, stabilize, and optimize your IT environments.
        Historically just for Red Hat Enterprise Linux, we are excited to
        announce that Insights for Red Hat OpenShift and Insights for Red Hat
        Ansible Automation Platform are available on cloud.redhat.com.
      </p>
    ),
    marketingContentSecondary: (
      <p>
        Insights is a suite of hosted services that provide enhanced visibility
        to improve the performance and stability of your hybrid cloud
        environments and system utilization. Powered by rule-based analytical
        models, Insights analyzes your deployments and alerts you to potential
        security, operations, and business risks based on Red Hat expertise and
        industry best practices. Insights is included with a Red Hat
        subscription.
      </p>
    ),
    marketingVideo: 'https://www.youtube.com/embed/NKL2j1yXHTM',
    marketingFigcaption: (
      <span>
        Red Hat® Summit 2021 provides a mix of innovation, collaboration, and
        learning opportunities.{' '}
        <a href="https://www.redhat.com/en/summit">Register or Login</a>
      </span>
    ),
    customBlock: (
      <CardFooter>
        <Flex
          direction={{ default: 'column' }}
          spaceItems={{ default: 'spaceItemsLg' }}
        >
          <Flex
            spaceItems={{
              sm: 'spaceItemsLg',
              lg: 'spaceItemsSm',
              xl: 'spaceItemsLg',
            }}
            direction={{
              default: 'column',
              sm: 'row',
              lg: 'column',
              xl: 'row',
            }}
          >
            <FlexItem>
              <Button
                className="ins-m-marketing"
                variant="primary"
                isLarge
                onClick={() => window.insights.chrome.auth.login()}
              >
                {productGridLoginText}
              </Button>
            </FlexItem>
            <FlexItem>
              <Button
                className="ins-m-marketing"
                variant="secondary"
                isLarge
                href="https://www.redhat.com/en/technologies/management/insights"
                component="a"
              >
                Learn more
              </Button>
            </FlexItem>
          </Flex>
          <FlexItem>
            <Button
              className="ins-m-marketing"
              variant="link"
              isInline
              isLarge
              href={`${window.location.href}security/insights`}
              component="a"
              icon={<ArrowRightIcon />}
              iconPosition="right"
            >
              Data collection and controls
            </Button>
          </FlexItem>
        </Flex>
      </CardFooter>
    ),
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
    body:
      'Identify and remediate configuration issues in your Red Hat® environments.',
  },
  {
    keyFeature: true,
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__private-cloud.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__update.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__build-deploy.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__control-panel.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__hybrid-cloud.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__exp-up.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__padlock.svg',
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
    icon:
      'https://cloud.redhat.com/apps/frontend-assets/icons/icon__modernize.svg',
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
    marketing: false,
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
    marketing: false,
    id: 'sap',
    url: 'insights',
    baseApp: '/sap',
    entitlement: 'insights',
    image: SAP,
    apps: {
      dashboard: '/sap',
    },
    title: 'Insights for SAP',
    body:
      'Leverage Insights to manage, optimize and remediate risks to your SAP landscape.',
  },
  {
    marketing: false,
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
    body:
      'Analyze, forecast and optimize your OpenShift cluster costs in hybrid cloud environments.',
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
