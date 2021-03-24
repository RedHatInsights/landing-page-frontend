import React from 'react';
import { Flex } from '@patternfly/react-core';
import recommendationRenderer from '../../components/app-content-renderer/recommendation-renderer';
import { useSelector } from 'react-redux';

const SecondPanel = () => {
  const secondPanel = useSelector(
    ({ contentStore: { secondPanel } }) => secondPanel
  );
  return (
    <Flex className="second-level">
      <Flex className="level-wrapper">
        {recommendationRenderer(secondPanel)}
      </Flex>
    </Flex>
  );
};

export default SecondPanel;
