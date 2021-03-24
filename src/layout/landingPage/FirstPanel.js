import React from 'react';
import { Flex } from '@patternfly/react-core';
import './styles/Panels.scss';
import estateRenderer from '../../components/app-content-renderer/estate-renderer';

const mockedData = [
  {
    section: 'Application services',
    count: '149',
    title: 'API objects',
  },
  {
    count: '30',
    title: 'Kafka instances',
  },
  {
    count: '331',
    title: 'ODH projects',
  },
  {
    section: 'Platforms',
    count: '12,302',
    title: 'RHEL systems',
    variant: 'danger',
    labelText: 'Needs Attention',
  },
  {
    count: '8',
    title: 'OpenShift clusters',
  },
  {
    section: 'Automation',
    count: '4',
    title: 'Tower clusters',
    variant: 'danger',
    labelText: 'Needs Attention',
  },
];

const FirstPanel = () => {
  return (
    <>
      <Flex className="first-level">
        <Flex className="level-wrapper">{estateRenderer(mockedData)}</Flex>
      </Flex>
    </>
  );
};

export default FirstPanel;
