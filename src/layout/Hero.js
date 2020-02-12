import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PageSection, Title, Button } from '@patternfly/react-core';

import './Hero.scss';

const Hero = ({ title, subtitle, needsCTA, className, ...props }) => (
    <PageSection
        className={ classnames(
            'ins-c-hero',
            'pf-m-fill',
            'pf-l-flex',
            'pf-m-align-items-center',
            'pf-m-justify-content-center',
            className) }
        { ...props }>
        <article className='pf-l-flex pf-m-column pf-m-align-items-center'>
            <Title size='4xl' headingLevel='h1' className='ins-c-hero__title pf-m-spacer-lg'> { title } </Title>
            <Title size='xl' headingLevel='h2' className='ins-c-hero__sub-title pf-m-spacer-xl'> { subtitle } </Title>
            { needsCTA &&
                <React.Fragment>
                    <Button
                        className='ins-c-hero__login'
                        onClick={ () => window.insights.chrome.auth.login() }>
                        Log in to your Red Hat account
                    </Button>
                    <Button
                        component='a'
                        isInline
                        variant='link'
                        className='ins-c-hero__new-customer'
                        href='https://www.redhat.com/en/customers'>
                        Not a customer?
                    </Button>
                </React.Fragment>
            }
        </article>
    </PageSection>
);

export default Hero;

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.any,
    needsCTA: PropTypes.bool,
    className: PropTypes.string
};
