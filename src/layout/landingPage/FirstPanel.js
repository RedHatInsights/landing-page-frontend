import React from 'react';
import FirstPanelTile from './FirstPanelTile';
import { Flex, FlexItem } from '@patternfly/react-core';
import './styles/Panels.scss';

const FirstPanel = () => {
  return (
    <>
      <Flex className="first-level">
        <Flex className="section">
          <FlexItem>
            <p className="title">Application Services</p>
          </FlexItem>
          <Flex className="tileContainer">
            <FirstPanelTile header="###" title="Kafka Clusters" />
            <FirstPanelTile header="###" title="API Objects" />
            <FirstPanelTile header="###" title="OpenDataHub Objects" />
          </Flex>
        </Flex>
        <Flex className="section">
          <FlexItem>
            <p className="title">Platforms</p>
          </FlexItem>
          <Flex className="tileContainer">
            <FirstPanelTile header="###" title="API Objects" />
            <FirstPanelTile header="###" title="API Objects" />
          </Flex>
        </Flex>
        <Flex className="section">
          <FlexItem>
            <p className="title">Automation</p>
          </FlexItem>
          <Flex className="tileContainer">
            <FirstPanelTile header="###" title="API Objects" />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default FirstPanel;
