import React from 'react';
import { Flex, FlexItem, Title } from '@patternfly/react-core';
import BodyTile from './BodyTile';
import './styles/Body.scss';

const Body = () => {
  return (
    <Flex className="ins-c-landing-body">
      <Flex
        className="ins-c-landing-grouping"
        direction={{ default: 'column' }}
      >
        <FlexItem className="ins-c-landing-grouping__title">
          <Title headingLevel="h1" size="xl">
            Application Services Recommendations
          </Title>
        </FlexItem>
        <FlexItem>
          <BodyTile />
        </FlexItem>
        <FlexItem className="ins-c-landing-grouping--separator">
          <BodyTile />
        </FlexItem>
        <FlexItem className="ins-c-landing-grouping__title">
          <Title headingLevel="h1" size="xl">
            Automation recommendations
          </Title>
        </FlexItem>
        <FlexItem>
          <BodyTile />
        </FlexItem>
        <FlexItem>
          <BodyTile />
        </FlexItem>
      </Flex>
      <Flex
        className="ins-c-landing-grouping"
        direction={{ default: 'column' }}
      >
        <FlexItem className="ins-c-landing-grouping__title">
          <Title headingLevel="h1" size="xl">
            Platform insights
          </Title>
        </FlexItem>
        <FlexItem>
          <BodyTile title="Operational" />
        </FlexItem>
        <FlexItem>
          <BodyTile />
        </FlexItem>
        <FlexItem>
          <BodyTile title="Financial" />
        </FlexItem>
        <FlexItem>
          <BodyTile />
        </FlexItem>
      </Flex>
      <Flex
        className="ins-c-landing-grouping"
        direction={{ default: 'column' }}
      >
        <FlexItem className="ins-c-landing-grouping__title">
          <div style={{ marginBottom: '32px' }} />
        </FlexItem>
        <FlexItem>
          <BodyTile title="Security" />
        </FlexItem>
        <FlexItem>
          <BodyTile />
        </FlexItem>
      </Flex>
    </Flex>
  );
};

export default Body;
