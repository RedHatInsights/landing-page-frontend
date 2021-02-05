import React from 'react';
import { Flex, FlexItem, Text, Title } from '@patternfly/react-core';
import SecondPanelTile from './SecondPanelTile';

const SecondPanel = () => {
  return (
    <Flex className="second-level">
      <Flex className="level-wrapper">
        <Flex className="section">
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1">Application Services Recommendations</Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <SecondPanelTile />
              <SecondPanelTile />
            </FlexItem>
          </Flex>
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1" className="title">
                Automation recommendations
              </Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <SecondPanelTile />
              <SecondPanelTile />
            </FlexItem>
          </Flex>
        </Flex>
        <Flex className="section">
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1">Platform insights</Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <Title headingLevel="h2" size="md">
                Operational
              </Title>
              <SecondPanelTile />
              <SecondPanelTile />
            </FlexItem>
            <FlexItem className="tile-group">
              <Title headingLevel="h2" size="md">
                Financial
              </Title>
              <SecondPanelTile />
              <SecondPanelTile />
            </FlexItem>
          </Flex>
          <Flex className="subsection">
            <FlexItem>
              <Text component="h1" className="security">
                .
              </Text>
            </FlexItem>
            <FlexItem className="tile-group">
              <Title headingLevel="h2" size="md">
                Security
              </Title>
              <SecondPanelTile />
              <SecondPanelTile />
            </FlexItem>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SecondPanel;
