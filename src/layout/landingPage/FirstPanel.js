/* eslint-disable */
import React from 'react';
import FirstPanelTile from './FirstPanelTile';
import { 
  Title, 
  Flex, 
  FlexItem, 
  Gallery, 
  GalleryItem, 
  Stack, 
  StackItem 
} from '@patternfly/react-core'; 
import './styles/FirstPanel.scss';

const FirstPanel = () => {
  return (
    <>
      <Flex className="ins-p-console-landing-first-level">
        <Flex
          className="grouping"
          direction={{ default: 'column' }}
        >
          <FlexItem>
            <p className="title">
              Application Services
            </p>
          </FlexItem>
          <Flex>
            <FlexItem>
              <FirstPanelTile header="###" title="Kafka Clusters" />
            </FlexItem>
            <FlexItem>
              <FirstPanelTile header="###" title="API Objects" />
            </FlexItem>
            <FlexItem>
              <FirstPanelTile header="###" title="OpenDataHub Objects" />
            </FlexItem>
          </Flex>
        </Flex>
        <Flex
          className="grouping"
          direction={{ default: 'column' }}
        >
          <FlexItem>
            <p className="title">
              Platforms
            </p>
          </FlexItem>
          <Flex className="ins-c-tile-grouping">
            <FlexItem>
              <FirstPanelTile header="###" title="API Objects" />
            </FlexItem>
            <FlexItem>
              <FirstPanelTile header="###" title="API Objects" />
            </FlexItem>
          </Flex>
        </Flex>
        <Flex
          className="grouping"
          direction={{ default: 'column' }}
        >
          <FlexItem>
            <p className="title">
              Automation
            </p>
          </FlexItem>
          <Flex>
            <FlexItem>
              <FirstPanelTile header="###" title="API Objects" />
            </FlexItem>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default FirstPanel;
