import React from 'react';
import FirstPanelTile from './FirstPanelTile';
import { Flex } from '@patternfly/react-core';
import './styles/Panels.scss';

const FirstPanel = () => {
  return (
    <>
      <Flex className="first-level">
        <Flex className="level-wrapper">
          <FirstPanelTile
            section="Application Services"
            count="###"
            title="Kafka Clusters"
          />
          <FirstPanelTile count="###" title="API Objects" />
          <FirstPanelTile count="###" title="OpenDataHub Objects" />
          <FirstPanelTile section="Platforms" count="###" title="API Objects" />
          <FirstPanelTile count="###" title="API Objects" />
          <FirstPanelTile
            section="Automation"
            count="###"
            title="API Objects"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default FirstPanel;
