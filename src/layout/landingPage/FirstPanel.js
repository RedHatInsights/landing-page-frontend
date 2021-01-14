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
          className="ins-c-landing-header__grouping"
          direction={{ default: 'column' }}
        >
          <FlexItem>
            <Title
              className="ins-c-landing-header__groupingTitle"
              headingLevel="h1"
              size="lg"
            >
              Application Services
            </Title>
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
          className="ins-c-landing-header__grouping"
          direction={{ default: 'column' }}
        >
          <FlexItem>
            <Title className="ins-c-header--title" headingLevel="h1" size="lg">
              Platforms
            </Title>
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
          className="ins-c-landing-header__grouping"
          direction={{ default: 'column' }}
        >
          <FlexItem>
            <Title className="ins-c-header--title" headingLevel="h1" size="lg">
              Automation
            </Title>
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
