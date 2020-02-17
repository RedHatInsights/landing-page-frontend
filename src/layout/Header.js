import React from 'react';

import { PageSection, Title } from '@patternfly/react-core';

import './Hero.scss';

const Header = () => (
    <PageSection className='ins-c-hero pf-m-fill pf-l-flex pf-m-align-items-center pf-m-justify-content-center'>
        <article className='pf-l-flex pf-m-column pf-m-align-items-center'>
            <Title size='4xl' headingLevel='h1' className='ins-c-hero__title pf-m-spacer-lg'> Manage, automate, and optimize your IT </Title>
            <Title size='xl' headingLevel='h2' className='ins-c-hero__sub-title pf-m-spacer-xl'>
                Discover Red Hat<sup className='ins-c-rball'>®</sup> software-as-a-service
            </Title>
        </article>
    </PageSection>
);

export default Header;
