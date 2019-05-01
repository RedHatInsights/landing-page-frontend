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
    CardFooter
} from '@patternfly/react-core';

import { ArrowRightIcon, BinocularsIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Main } from '@red-hat-insights/insights-frontend-components';
import Hero from './Hero';

import './Marketing.scss';

// TODO Chrome should have a function for this
// something like `window.insights.chrome.isBeta
const isBeta = window.location.pathname.indexOf('/beta') === 0;

const Marketing = ({ technologies }) => (
    <React.Fragment>
        <Hero/>
        <Main className='ins-c-marketing pf-m-no-fill'>
            <Grid sm={ 12 } md={ 6 } lg={ isBeta ? 3 : 4 } gutter="md">
                { technologies.map(({ marketingImage, title, url, marketingText, isPreview, id }, key) => (
                    <GridItem key={ key }>
                        <a className='ins-c-card__link' href={ `./${url}` } aria-label={ `Go to ${title}` }>
                            <Card className="ins-c-application-info" application-id={ id }>
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
                                        { isPreview &&
                                            <StackItem>
                                                <div className="ins-m-tech-preview">
                                                    <BinocularsIcon size="sm" /> Tech Preview
                                                </div>
                                            </StackItem>
                                        }
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
                            </Card>
                        </a>
                    </GridItem>
                )) }
            </Grid>
        </Main>
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
        technologies: technologies && technologies.activeTechnologies.filter(({ disabled }) => !disabled)
    };
}

export { mapStateToProps };
export default connect(mapStateToProps)(Marketing);
