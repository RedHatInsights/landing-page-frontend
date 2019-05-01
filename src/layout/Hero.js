import React from 'react';

import { Bullseye, Title, Button } from '@patternfly/react-core';

import './Hero.scss';

const Hero = () => (
    <section className='pf-c-page__main-section ins-c-hero pf-m-fill'>
        <Bullseye className='pf-l-flex pf-m-column pf-m-align-items-center'>
            <Title className='ins-c-hero__title pf-m-spacer-lg'> Explore our open, multicloud tools </Title>
            <Title headingLevel='h2' className='pf-m-spacer-xl'> Discover Red Hat <sup>®</sup> software-as-a-service </Title>
            <Button> Log in to your Red Hat account</Button>
            <a> Not a customer? </a>
        </Bullseye>
    </section>
);

export default Hero;
