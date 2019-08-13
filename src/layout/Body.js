import React, { Fragment } from 'react';
import {
    Card, CardHeader,
    CardBody,
    Grid,
    Stack,
    StackItem,
    Title,
    CardFooter,
    PageSection,
    Gallery,
    GalleryItem,
    Text,
    TextVariants,
    TextContent
} from '@patternfly/react-core';

import { ArrowRightIcon, BinocularsIcon, CodeIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Body.scss';

// TODO Chrome should have a function for this
// something like `window.insights.chrome.isBeta
const isBeta = window.location.pathname.indexOf('/beta') === 0;

const Body = ({ technologies }) => (
    <Fragment>
        <PageSection className='pf-m-fill'>
            <Grid md={ 6 } lg={ isBeta ? 3 : 4 } gutter="md">
                { technologies.map(({ icon: Icon, image, iconProps, title, url, body, isTile, isPreview, isDevPreview, id }, key) => (
                    isTile &&
                        <Card className="ins-c-application-info pf-m-card-link" application-id={ id } key={ key }>
                            <CardHeader>
                                <Stack gutter='sm'>
                                    <StackItem>
                                        { image && <img
                                            className="ins-c-application-info__logo"
                                            aria-hidden
                                            src={ image }
                                            alt={ `${title} logo` } /> }
                                        { Icon && <Icon
                                            className="ins-c-application-info__logo ins-c-icon__active"
                                            aria-hidden
                                            size="xl"
                                            alt={ `${title} logo` }
                                            { ...iconProps } /> }
                                    </StackItem>
                                    <StackItem>
                                        <Title headingLevel='h2' size='2xl'>
                                            { title }
                                        </Title>
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
                                    { isDevPreview &&
                                        <StackItem>
                                            <div className="ins-m-dev-preview">
                                                <CodeIcon size="sm" /> Developer Preview
                                            </div>
                                        </StackItem>
                                    }
                                    <StackItem>
                                        <span className='ins-m-gray'>{ body }</span>
                                    </StackItem>
                                </Stack>
                            </CardBody>
                            <CardFooter>
                                <div className="ins-c-open-card pf-l-flex pf-m-align-items-center pf-m-inline-flex">
                                    <span>
                                        Open
                                    </span>
                                    <ArrowRightIcon size="sm" />
                                </div>
                            </CardFooter>
                            <a className='pf-c-card__card-link' href={ `./${url}` } aria-label={ `Go to ${title}` }></a>
                        </Card>
                )) }
            </Grid>
        </PageSection>
        <PageSection className='ins-c-banner'>
            <Gallery gutter="md" className='ins-c-banner__item'>
                { technologies.map(({ icon: Icon, image, iconProps, title, url, body, isTile, isPreview, isDevPreview, id }, key) => (
                    !isTile &&
                        <GalleryItem className='ins-c-card__mini'>
                            <TextContent className='ins-c-card__mini--header'>
                                { image && <img
                                    className="ins-c-application-info__logo"
                                    aria-hidden
                                    src={ image }
                                    alt={ `${title} logo` } /> }
                                { Icon && <Icon
                                    className="ins-c-application-info__logo ins-c-icon__active"
                                    aria-hidden
                                    size="md"
                                    alt={ `${title} logo` }
                                    { ...iconProps } /> }
                                <Text component={ TextVariants.h4 }>{title}</Text>
                            </TextContent>
                            <section className='ins-c-card__mini--body'>
                                <a> test </a>
                            </section>
                            <section className='ins-c-card__mini--footer'>
                                <div className="ins-c-open-card pf-l-flex pf-m-align-items-center pf-m-inline-flex">
                                    <span>
                                        Open
                                    </span>
                                    <ArrowRightIcon size="sm" />
                                </div>
                                <a className='pf-c-card__card-link' href={ `./${url}` } aria-label={ `Go to ${title}` }></a>
                            </section>
                        </GalleryItem>
                )) }
            </Gallery>
        </PageSection>
    </Fragment>
);

Body.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        body: PropTypes.node,
        title: PropTypes.node,
        isPreview: PropTypes.bool,
        isCard: PropTypes.bool
    }))
};

Body.defaultProps = {
    technologies: []
};

function mapStateToProps({ technologies } = { technologies: { activeTechnologies: []}}) {
    return {
        technologies: technologies && technologies.activeTechnologies.filter(({ disabled }) => !disabled)
    };
}

export { mapStateToProps };
export default connect(mapStateToProps)(Body);
