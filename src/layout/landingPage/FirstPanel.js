import React from 'react';
import { Flex } from '@patternfly/react-core';
import { shallowEqual, useSelector } from 'react-redux';

import estateRenderer from '../../components/app-content-renderer/estate-renderer';

import './styles/Panels.scss';

const FirstPanel = () => {
  const firstPanel = useSelector(
    ({ contentStore: { firstPanel } }) => firstPanel,
    shallowEqual
  );
  return (
    <Flex className="first-level">
      <Flex className="level-wrapper">{estateRenderer(firstPanel)}</Flex>
    </Flex>
  );
};

export default FirstPanel;
