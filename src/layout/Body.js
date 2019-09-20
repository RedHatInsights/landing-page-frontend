import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Grid,
    GridItem,
    Stack,
    StackItem,
    Title,
    PageSection
} from '@patternfly/react-core';

import { ArrowRightIcon, BinocularsIcon, CodeIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Body.scss';

function isBeta() {
    return (window.insights.chrome.isBeta() === true ? '/beta/' : '/');
}

const Body = ({ technologies }) => (
    <PageSection className='pf-m-fill ins-p-landing__content'>
        <Grid md={ 6 } lg={ 4 } gutter="md">
            { technologies.map(({ icon: Icon, image, iconProps, title, url, apps, baseApp, body, isPreview, isDevPreview, id }, key) => (
                <GridItem key={ key }>
                    <Card className="ins-c-application-info" application-id={ id }>
                        <CardHeader>
                            <Stack>
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
                            <Stack gutter='md' className='ins-c-application-info__content'>
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
                                    { apps && Object.entries(apps).map(([ appName, appPath ]) => (
                                        <a key={ appName } href={ `${isBeta()}${url}${appPath}` }>{ appName }</a>
                                    )) }
                                </StackItem>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <a className={ `ins-c-application-info__open ins-c-application-info__open-${url}` }
                                href= { baseApp ? `${isBeta()}${url}${baseApp}` : `${isBeta()}${url}` }>
                                <span> Open </span>
                                <ArrowRightIcon size="sm" />
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>
            )) }
        </Grid>
    </PageSection>
);

Body.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        body: PropTypes.node,
        title: PropTypes.node,
        isPreview: PropTypes.bool,
        url: PropTypes.string,
        apps: PropTypes.object,
        baseApp: PropTypes.string
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
