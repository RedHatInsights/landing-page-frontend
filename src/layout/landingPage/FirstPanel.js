import React from 'react';
import FirstPanelTile from './FirstPanelTile';
import { Flex, FlexItem, Text } from '@patternfly/react-core';
import './styles/Panels.scss';

const FirstPanel = () => {
  return (
    <>
      <Flex className="first-level">
        <Flex className="section">
          <FlexItem>
            <Text component="p" className="title">
              Application Services
            </Text>
          </FlexItem>
          <Flex className="tileContainer">
            <FirstPanelTile header="###" title="Kafka Clusters" />
            <FirstPanelTile header="###" title="API Objects" />
            <FirstPanelTile header="###" title="OpenDataHub Objects" />
          </Flex>
        </Flex>
        <Flex className="section">
          <FlexItem>
            <Text component="p" className="title">
              Platforms
            </Text>
          </FlexItem>
          <Flex className="tileContainer">
            <FirstPanelTile header="###" title="API Objects" />
            <FirstPanelTile header="###" title="API Objects" />
          </Flex>
        </Flex>
        <Flex className="section">
          <FlexItem>
            <Text component="p" className="title">
              Automation
            </Text>
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
