import React from 'react';
import {
    Card, CardHeader,
    CardBody,
    Split,
    SplitItem,
    Grid,
    Stack,
    StackItem,
    GridItem,
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
            <Grid sm={ 12 } md={ 6 } lg={ 4 } gutter="md">
                { technologies.map(({ marketingImage, title, marketingUrl, marketingText, id }, key) => (
                    <Card className="ins-c-application-info pf-m-card-link" application-id={ id }>
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
                                <Split gutter="sm" className="ins-c-open-card">
                                    <SplitItem>
                                        Get Started
                                    </SplitItem>
                                    <SplitItem>
                                        <ArrowRightIcon size="sm" />
                                    </SplitItem>
                                </Split>
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
        name: PropTypes.string,
        icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        body: PropTypes.node,
        tite: PropTypes.node,
        isPreview: PropTypes.bool
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
