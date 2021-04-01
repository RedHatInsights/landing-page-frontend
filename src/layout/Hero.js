import React from 'react';

import {
  Button,
  Flex,
  FlexItem,
  PageSection,
  Title,
} from '@patternfly/react-core';
import IconCloud from './images/icon__cloud-red.svg';
import WidthLimiter from '../components/WidthLimiter.js';
import HeroIcon from '../components/HeroIcon.js';
import './Hero.scss';

import { heroContent as heroContent } from '../consts';

const Hero = () => (
  <PageSection
    className="ins-c-hero pf-m-center ins-m-display-md"
    isWidthLimited
  >
    <Flex className="pf-m-column" spaceItems={{ default: 'spaceItemsXl' }}>
      <FlexItem spacer={{ default: 'spacerMd', md: 'spacerXl' }}>
        <HeroIcon src={IconCloud} alt="Insights Smart Management" />
      </FlexItem>
      <WidthLimiter
        style={{
          '--pf-c-width-limiter--MaxWidth-on-md': '40ch',
          '--pf-c-width-limiter--MaxWidth-on-lg': '45ch',
          '--pf-c-width-limiter--MaxWidth-on-xl': '54ch',
        }}
      >
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
      </WidthLimiter>
      <Flex spaceItems={{ default: 'spaceItemsXl' }}>
        <Button
          className="ins-m-marketing"
          variant="primary"
          isLarge
          onClick={() => window.insights.chrome.auth.login()}
        >
          {heroContent.primaryCTAtext}
        </Button>
        {/* Activate when support is available
        <Button
          className="ins-m-marketing"
          variant="secondary"
          component="a"
          isLarge
          href={heroContent.secondaryCTAurl}
        >
          {heroContent.secondaryCTAtext}
        </Button> */}
      </Flex>
    </Flex>
  </PageSection>
);

export default Hero;
