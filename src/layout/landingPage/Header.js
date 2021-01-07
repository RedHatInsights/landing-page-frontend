import React from 'react';
import HeaderTile from './HeaderTile';
import { Title, Flex, FlexItem } from '@patternfly/react-core'; //eslint-disable-line
import './styles/Header.scss';

const Header = () => {
  return (
    <>
      <Flex className="ins-c-landing-header">
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
              <HeaderTile header="###" title="Kafka Clusters" />
            </FlexItem>
            <FlexItem>
              <HeaderTile header="###" title="API Objects" />
            </FlexItem>
            <FlexItem>
              <HeaderTile header="###" title="OpenDataHub Objects" />
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
              <HeaderTile header="###" title="API Objects" />
            </FlexItem>
            <FlexItem>
              <HeaderTile header="###" title="API Objects" />
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
              <HeaderTile header="###" title="API Objects" />
            </FlexItem>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
