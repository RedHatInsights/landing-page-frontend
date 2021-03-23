import React from 'react';
import { Flex } from '@patternfly/react-core';
import recommendationRenderer from '../../components/app-content-renderer/recommendation-renderer';

const mockData = [
  {
    title: 'Automation recommendations',
    id: 'automations',
    sections: [
      {
        title: 'Automation recommendations',
        groups: [
          {
            id: 'job-errors',
            icon: 'automation',
            description: '65 jobs with ‘error’ state detected in last 24h',
            state: 'error',
            action: {
              url: './#',
              title: 'Details',
            },
          },
          {
            id: 'no-updates',
            icon: 'automation',
            description: 'No data received in 5 days',
            state: 'warning',
            action: {
              url: './#',
              title: 'Details',
            },
          },
          {
            id: 'license-expirations',
            icon: 'exclamationTriangle',
            description: 'License expires in 7 days',
            state: 'warning',
            action: {
              url: './#',
              title: 'Update',
            },
          },
          {
            id: 'license-capacity',
            icon: 'exclamationCircle',
            description: 'License capacity is insufficient',
            state: 'error',
            action: {
              url: './#',
              title: 'Update',
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Platform insights',
    id: 'insights',
    sections: [
      {
        title: 'Platform insights',
        id: 'operational',
        groups: [
          {
            id: 'operational',
            component: 'title',
            title: 'Operational',
          },
          {
            id: 'operational',
            description: '9 active incidents detected',
            icon: 'infoCircle',
            state: 'info',
            action: {
              url: './#',
              title: 'Details',
            },
          },
          {
            id: 'avaiable-registration',
            description: '140 systems available for registration',
            icon: 'infoCircle',
            state: 'info',
            action: {
              url: './#',
              title: 'Register',
            },
          },
          {
            id: 'business',
            title: 'Business',
            component: 'title',
          },
          {
            icon: 'exclamationTriangle',
            id: 'subs-thres',
            description: 'Subscription consumption threshold reached',
            state: 'warning',
            action: {
              url: './#',
              title: 'View',
            },
          },
          {
            icon: 'checkCircle',
            id: 'under-utilized',
            description: '41 under-utilized cloud resources',
            state: 'success',
            action: {
              url: './#',
              title: 'Optimize',
            },
          },
        ],
      },
      {
        id: 'security',
        title: '.', // fix this
        groups: [
          {
            id: 'sec',
            title: 'Security',
            component: 'title',
          },
          {
            id: 'critical-cves',
            state: 'error',
            icon: 'security',
            description: '37 critical CVEs identified',
            action: {
              url: `${
                window.insights.chrome.isBeta() === true ? '/beta/' : '/'
              }insights/vulnerability`,
              title: 'Respond',
            },
          },
          {
            id: 'out-of-comp',
            state: 'warning',
            icon: 'security',
            description: '12 systems out of compliance',
            action: {
              title: 'View',
              url: './#',
            },
          },
        ],
      },
    ],
  },
];

const SecondPanel = () => {
  return (
    <Flex className="second-level">
      <Flex className="level-wrapper">{recommendationRenderer(mockData)}</Flex>
    </Flex>
  );
};

export default SecondPanel;
