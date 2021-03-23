import React from 'react';
import { Flex } from '@patternfly/react-core';
import configTryLearnRenderer from '../../components/app-content-renderer/config-try-learn-renderer';

const mockData = [
  {
    id: 'configure',
    title: 'Configure',
    items: [
      {
        icon: 'connected',
        title: 'Connect your cloud resources',
        link: {
          title: 'Configure Sources',
          href: `${
            window.insights.chrome.isBeta() === true ? '/beta/' : '/'
          }settings/sources`,
        },
      },
      {
        icon: 'insights',
        title: 'Register with Insights',
        link: {
          title: 'Registration Assistant',
          href: `./#`,
        },
      },
    ],
  },
  {
    id: 'try',
    title: 'Try',
    items: [
      {
        icon: 'builderImage',
        title: 'Image Builder',
        link: {
          title: 'Try it',
          href: './#',
        },
      },
      {
        icon: 'couldTenant',
        title: 'Remediate from the cloud',
        link: {
          title: 'Try it',
          href: `./#`,
        },
      },
    ],
  },
  {
    id: 'learn',
    title: 'Learn',
    items: [
      {
        icon: 'cloudSecurity',
        title: 'Trust & Security',
        link: {
          title: 'Learn more',
          href: './#',
        },
      },
      {
        icon: 'ansible',
        title: 'Ansible Automation Hub',
        link: {
          title: 'Learn more',
          href: `./#`,
        },
      },
    ],
  },
];

const Footer = () => {
  return (
    <Flex className="third-level">
      <Flex className="level-wrapper">{configTryLearnRenderer(mockData)}</Flex>
    </Flex>
  );
};

export default Footer;
