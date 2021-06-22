import React from 'react';

import {
  Button,
  Flex,
  FlexItem,
  PageSection,
  Title,
} from '@patternfly/react-core';
import WidthLimiter from '../components/WidthLimiter.js';
import './Hero.scss';

import { heroContent } from '../consts';

const Hero = () => (
  <PageSection
    className="ins-c-hero pf-m-center ins-m-display-md"
    isWidthLimited
  >
    <WidthLimiter
      style={{
        '--pf-c-width-limiter--MaxWidth-on-md': '40ch',
        '--pf-c-width-limiter--MaxWidth-on-lg': '45ch',
        '--pf-c-width-limiter--MaxWidth-on-xl': '54ch',
      }}
    >
      <Flex className="pf-m-column" spaceItems={{ default: 'spaceItemsXl' }}>
        <FlexItem spacer={{ default: 'spacerMd', md: 'spacerXl' }}>
          <img
            src="https://console.redhat.com/apps/frontend-assets/icons/icon__cloud-red.svg"
            alt="Insights Smart Management"
            aria-hidden="true"
            className="ins-c-hero__title-icon"
          />
        </FlexItem>
        <Flex
          direction={{ default: 'column' }}
          spaceItems={{ default: 'spaceItemsLg' }}
        >
          <Title
            headingLevel="h1"
            className="ins-c-hero__title pf-u-font-weight-light"
          >
            {heroContent.title}
          </Title>
          <Title headingLevel="h2" size="xl" className="pf-u-font-weight-light">
            {heroContent.subTitle}
          </Title>
        </Flex>
        <Flex spaceItems={{ default: 'spaceItemsXl' }}>
          <Button
            className="ins-m-marketing"
            variant="primary"
            isLarge
            ouiaId="primary-login-button"
            onClick={() => window.insights.chrome.auth.login()}
          >
            {heroContent.primaryCTAtext}
          </Button>
        </Flex>
      </Flex>
    </WidthLimiter>
  </PageSection>
);

export default Hero;
