import React from 'react';
import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { CardHeader } from '@patternfly/react-core/dist/js/components/Card/CardHeader';
import { CardBody } from '@patternfly/react-core/dist/js/components/Card/CardBody';
import { Grid } from '@patternfly/react-core/dist/js/layouts/Grid/Grid';
import { Stack } from '@patternfly/react-core/dist/js/layouts/Stack/Stack';
import { StackItem } from '@patternfly/react-core/dist/js/layouts/Stack/StackItem';
import { CardFooter } from '@patternfly/react-core/dist/js/components/Card/CardFooter';
import { PageSection } from '@patternfly/react-core/dist/js/components/Page/PageSection';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Hero from './Hero';

import './Marketing.scss';

const Marketing = ({ technologies }) => (
    <React.Fragment>
        <Hero/>
        <PageSection className='ins-c-marketing pf-m-no-fill' landing-page-type='unauthenticated'>
            <Grid sm={ 12 } md={ 6 } xl={ 6 } xl2={ 4 } gutter="sm">
                { technologies.map(({ marketingImage, title, marketingUrls, marketingText, id }, key) => (
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
                        <CardFooter className='pf-c-card__card-links'>
                            <a href={ marketingUrls.learnMore } aria-label={ `Go to ${title}` }>Learn more<ArrowRightIcon size="sm" /></a>
                            { marketingUrls.tryIt &&
                                <a href={ marketingUrls.tryIt } aria-label='Request an evaluation'>Try it<ArrowRightIcon size="sm" /></a>
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
        marketingImage: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        marketing: PropTypes.bool,
        marketingUrls: PropTypes.object,
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
