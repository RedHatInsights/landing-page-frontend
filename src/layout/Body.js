import React, { Fragment } from 'react';
import {
    Card,
    CardBody,
    Gallery,
    GalleryItem,
    Stack,
    StackItem,
    Split,
    SplitItem,
    Title,
    PageSection
} from '@patternfly/react-core';

import { ArrowRightIcon, BinocularsIcon, CodeIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Body.scss';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Body = ({ technologies }) => (
    <Fragment>
        <PageSection className='pf-m-fill'>
            <Gallery gutter="md">
                { technologies.map(({ icon: Icon, image, iconProps, title, url, apps, baseApp, body, isPreview, isDevPreview, id }, key) => (
                    <GalleryItem key='key'>
                        <Card className="ins-c-application-info" application-id={ id } key={ key }>
                            <CardBody>
                                <Split gutter='md' className='ins-c-application-info__split'>
                                    <SplitItem>
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
                                    </SplitItem>
                                    <SplitItem className='ins-c-application-info__content'>
                                        <Stack gutter='md'>
                                            <StackItem>
                                                <Title headingLevel='h2' size='2xl'>
                                                    { title }
                                                </Title>
                                            </StackItem>
                                            { isPreview &&
                                                <StackItem>
                                                    <div className="ins-m-tech-preview">
                                                        <BinocularsIcon size="sm" /> Tech preview
                                                    </div>
                                                </StackItem>
                                            }
                                            { isDevPreview &&
                                                <StackItem>
                                                    <div className="ins-m-dev-preview">
                                                        <CodeIcon size="sm" /> Developer preview
                                                    </div>
                                                </StackItem>
                                            }
                                            <StackItem>
                                                <span className='ins-m-gray'>{ body }</span>
                                            </StackItem>
                                            <StackItem className='ins-c-application-info__content-applist'>
                                                { apps && Object.entries(apps).map(([ appName, appPath ]) => {
                                                    return (
                                                        <a key={ appName } href={ `${url}${appPath}` }>{ capitalize(appName) }</a>
                                                    );
                                                }) }
                                            </StackItem>
                                            <StackItem className="ins-c-application-info__open">
                                                <a href= { baseApp ? `${url}${baseApp}` : `${url}` }>
                                                    Open
                                                    <ArrowRightIcon size="sm" />
                                                </a>
                                            </StackItem>
                                        </Stack>
                                    </SplitItem>
                                </Split>
                            </CardBody>
                        </Card>
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
        isPreview: PropTypes.bool
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
