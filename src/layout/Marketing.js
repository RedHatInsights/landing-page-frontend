import React from 'react';
import {
    Card, CardHeader,
    CardBody,
    Grid,
    Stack,
    StackItem,
    CardFooter,
    PageSection
} from '@patternfly/react-core';

import { ArrowRightIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Hero from './Hero';

import './Marketing.scss';

export const Marketing = ({ technologies }) => (
    <React.Fragment>
        <Hero
            title='Explore our open, multicloud tools'
            subtitle={ <span>Discover Red Hat<sup className='ins-c-rball'>®</sup> software-as-a-service</span> }
            needsCTA
            className='ins-p-marketing__hero'/>
        <PageSection className='ins-c-marketing pf-m-no-fill'>
            <Grid sm={ 12 } md={ 6 } xl={ 6 } xl2={ 3 } gutter="sm">
                { technologies.map(({ image, title, actions, description, id }, key) => (
                    <Card className="ins-c-application-info pf-m-card-link" application-id={ id } key={ key }>
                        <CardHeader>
                            <Stack gutter='sm'>
                                <StackItem className='ins-c-application-logo'>
                                    { image && <img
                                        className="ins-c-application-info__logo"
                                        aria-hidden
                                        src={ image }
                                        alt={ `${title} logo` } /> }
                                </StackItem>
                            </Stack>
                        </CardHeader>
                        <CardBody>
                            <Stack>
                                <StackItem>
                                    <span className='ins-m-gray'>{ description }</span>
                                </StackItem>
                            </Stack>
                        </CardBody>
                        <CardFooter className='pf-c-card__card-links'>
                            <a href={ actions.learnMore } aria-label={ `Go to ${title}` }>Learn more<ArrowRightIcon size="sm" /></a>
                            { actions.tryIt &&
                                <a href={ actions.tryIt } aria-label='Request an evaluation'>Try it<ArrowRightIcon size="sm" /></a>
                            }
                        </CardFooter>
                    </Card>
                )) }
            </Grid>
        </PageSection>
    </React.Fragment>
);

Marketing.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        marketing: PropTypes.bool,
        actions: PropTypes.object,
        description: PropTypes.string
    }))
};

Marketing.defaultProps = {
    technologies: []
};

function mapStateToProps({ technologies } = { technologies: { marketingTechnologies: []}}) {
    return {
        technologies: technologies.marketingTechnologies
    };
}

export { mapStateToProps };
export default connect(mapStateToProps)(Marketing);
