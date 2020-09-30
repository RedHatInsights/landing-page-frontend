import React from 'react';

import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';

import './Hero.scss';

const Hero = () => (
    <PageSection className='ins-c-hero pf-m-fill pf-l-flex pf-m-align-items-center pf-m-justify-content-center'>
        <article className='pf-l-flex pf-m-column pf-m-align-items-center'>
            <Title headingLevel='h1' size='4xl' className='ins-c-hero__title pf-m-spacer-lg'> Explore our open, multicloud tools </Title>
            <Title headingLevel='h2' className='ins-c-hero__sub-title pf-m-spacer-xl'>
                Discover Red Hat<sup className='ins-c-rball'>®</sup> software-as-a-service
            </Title>
            <Button className='ins-c-hero__login' onClick={ () => window.insights.chrome.auth.login() }> Log in to your Red Hat account</Button>
            <Button
                component='a'
                isInline
                variant='link'
                className='ins-c-hero__new-customer'
                href='https://www.redhat.com/en/customers'>
                Not a customer?
            </Button>
        </article>
    </PageSection>
);

export default Hero;
