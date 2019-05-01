import React from 'react';

import { Bullseye, Title, Button } from '@patternfly/react-core';

import './Hero.scss';

const Hero = () => (
    <Bullseye className='ins-c-hero'>
        <Title size="4xl"> Open, multicloud tools</Title>
        <Title headingLevel='h2' size='xl'> Discover Red Hat software as a service</Title>
        <Button> Log in to your Red Hat account</Button>
        <a> Not a customer? </a>
    </Bullseye>
);

export default Hero;
