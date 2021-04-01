import React from 'react';
import {
  Button,
  Flex,
  FlexItem,
  PageSection,
  PageSectionVariants,
  Title,
} from '@patternfly/react-core';
import './GetStarted.scss';
import { getStarted as getStarted } from '../consts';

const GetStarted = () => (
  <PageSection
    className="ins-c-get-started ins-m-display-md pf-m-center"
    landing-page-type="unauthenticated"
    isWidthLimited
    variant={PageSectionVariants.light}
  >
    <Flex
      direction={{ default: 'column' }}
      spaceItems={{ default: 'spaceItemsLg' }}
      alignItems={{ default: 'alignItemsCenter' }}
    >
      <FlexItem>
        <Title
          headingLevel="h2"
          size="4xl"
          className="pf-u-font-weight-light pf-u-text-align-center"
        >
          {getStarted.title}
        </Title>
      </FlexItem>
      <FlexItem>
        <Button
          className="ins-m-marketing"
          variant="primary"
          isLarge
          onClick={() => window.insights.chrome.auth.login()}
        >
          {getStarted.ctaText}
        </Button>
      </FlexItem>
    </Flex>
  </PageSection>
);

export default GetStarted;
