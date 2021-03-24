import React from 'react';
import { Flex } from '@patternfly/react-core';
import { shallowEqual, useSelector } from 'react-redux';

import estateRenderer from '../../components/app-content-renderer/estate-renderer';

import './styles/Panels.scss';

const FirstPanel = () => {
  const estate = useSelector(
    ({ contentStore: { estate } }) => estate,
    shallowEqual
  );
  return (
    <Flex className="first-level">
      <Flex className="level-wrapper">{estateRenderer(estate)}</Flex>
    </Flex>
  );
};

export default FirstPanel;
