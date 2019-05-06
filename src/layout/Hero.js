import React from 'react';

import { PageSection, Title, Button } from '@patternfly/react-core';

import './Hero.scss';

const Hero = () => (
    <PageSection className='ins-c-hero pf-m-fill pf-l-flex pf-m-align-items-center pf-m-justify-content-center'>
        <article className='pf-l-flex pf-m-column pf-m-align-items-center'>
            <Title className='ins-c-hero__title pf-m-spacer-lg'> Explore our open, multicloud tools </Title>
            <Title headingLevel='h2' className='pf-m-spacer-xl'> Discover Red Hat <sup>®</sup> software-as-a-service </Title>
            <Button onClick={ () => window.insights.chrome.auth.login() }> Log in to your Red Hat account</Button>
            <a href='https://www.redhat.com/en/customers'> Not a customer? </a>
        </article>
    </PageSection>
);

export default Hero;
