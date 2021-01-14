import React from 'react';
import { Title, Flex, FlexItem } from '@patternfly/react-core';
import SecondPanelTile from './SecondPanelTile';
import './styles/SecondPanel.scss';

const SecondPanel = () => {
  return (
    <Flex className="ins-p-console-landing-second-level" hasGutter>
      <FlexItem>
        <Flex>
          <FlexItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              Application Services Recommendations
            </Title>
          </FlexItem>
          <FlexItem>
            <SecondPanelTile />
          </FlexItem>
          <FlexItem className="ins-c-landing-grouping--separator">
            <SecondPanelTile />
          </FlexItem>
          <br />
          <FlexItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              Automation recommendations
            </Title>
          </FlexItem>
          <FlexItem>
            <SecondPanelTile />
          </FlexItem>
          <FlexItem>
            <SecondPanelTile />
          </FlexItem>
        </Flex>
      </FlexItem>

      <FlexItem>
        <Flex>
          <FlexItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              Platform insights
            </Title>
          </FlexItem>
          <FlexItem>
            <SecondPanelTile title="Operational" />
          </FlexItem>
          <FlexItem>
            <SecondPanelTile />
          </FlexItem>
          <FlexItem>
            <SecondPanelTile title="Financial" />
          </FlexItem>
          <FlexItem>
            <SecondPanelTile />
          </FlexItem>
        </Flex>
      </FlexItem>

      <FlexItem>
        <Flex>
          <FlexItem className="ins-c-landing-grouping__title">
            <Title headingLevel="h1" size="xl">
              &nbsp;
            </Title>
          </FlexItem>
          <FlexItem>
            <SecondPanelTile title="Security" />
          </FlexItem>
          <FlexItem>
            <SecondPanelTile />
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
};

export default SecondPanel;
