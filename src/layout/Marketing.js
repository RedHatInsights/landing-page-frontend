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

const Marketing = ({ technologies }) => (
    <React.Fragment>
        <Hero/>
        <PageSection className='ins-c-marketing pf-m-no-fill'>
            <Grid sm={ 12 } md={ 6 } xl={ 3 } gutter="md">
                { technologies.map(({ marketingImage, title, marketingUrl, marketingText, id }, key) => (
                    <Card className="ins-c-application-info pf-m-card-link" application-id={ id } key={ key }>
                        <CardHeader>
                            <Stack gutter='sm'>
                                <StackItem className='ins-c-application-logo'>
                                    { marketingImage && <img
                                        className="ins-c-application-info__logo"
                                        aria-hidden
                                        src={ marketingImage }
                                        alt={ `${title} logo` } /> }
                                </StackItem>
                            </Stack>
                        </CardHeader>
                        <CardBody>
                            <Stack>
                                <StackItem>
                                    <span className='ins-m-gray'>{ marketingText }</span>
                                </StackItem>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <div className="ins-c-open-card pf-l-flex pf-m-align-items-center">
                                <span>
                                    Learn more
                                </span>
                                <ArrowRightIcon size="sm" />
                            </div>
                        </CardFooter>
                        <a className='pf-c-card__card-link' href={ marketingUrl } aria-label={ `Go to ${title}` }></a>
                    </Card>
                )) }
            </Grid>
        </PageSection>
    </React.Fragment>
);

Marketing.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        marketingImage: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        marketing: PropTypes.bool,
        marketingUrl: PropTypes.string,
        marketingText: PropTypes.string
    }))
};

Marketing.defaultProps = {
    technologies: []
};

function mapStateToProps({ technologies } = { technologies: { activeTechnologies: []}}) {
    return {
        technologies: technologies && technologies.activeTechnologies.filter(({ marketing }) => marketing)
    };
}

export { mapStateToProps };
export default connect(mapStateToProps)(Marketing);
