import React, { Fragment, Component } from 'react';
import {
    Bullseye,
    Card,
    CardBody,
    Split,
    SplitItem,
    Grid,
    Stack,
    StackItem,
    GridItem,
    TextContent,
    Text,
    TextVariants
} from '@patternfly/react-core';
import { ArrowRightIcon, BinocularsIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Body extends Component {
    onLaunchClick = (event, name, url, title) => {
        event.preventDefault();
        localStorage.setItem('cs-app', name);
        localStorage.setItem('cs-app-title', title);
        window.location.href = `${document.baseURI}platform/${url}`;
    }

    render() {
        const { technologies } = this.props;
        return (
            <Fragment>
                <div>
                    <Bullseye>
                        <TextContent>
                            <Text component={ TextVariants.h2 } className="ins-m-bold">
                                Explore Cloud Technologies
                            </Text>
                        </TextContent>
                    </Bullseye>
                </div>
                <Grid sm={ 12 } md={ 6 } lg={ 3 } gutter="md">
                    { technologies.map(({ icon, iconProps, title, url, body, isPreview, name }, key) => (
                        <GridItem key={ key }>
                            <Card className="ins-c-application-info">
                                <CardBody>
                                    <Stack gutter="md">
                                        <StackItem>
                                            <img className="ins-c-application-info__logo" src={ icon } alt={ `${title} logo` } { ...iconProps } />
                                        </StackItem>
                                        <StackItem isMain>
                                            <TextContent>
                                                <Text component={ TextVariants.h2 }>
                                                    { title }
                                                </Text>
                                                { isPreview &&
                                                    <Text component={ TextVariants.small } className="ins-c-text__regular-size ins-m-tech-preview">
                                                        <BinocularsIcon size="sm" /> Tech Preview
                                                    </Text>
                                                }
                                                <Text component={ TextVariants.small } className="ins-c-text__regular-size">
                                                    { body }
                                                </Text>
                                            </TextContent>
                                        </StackItem>
                                        <StackItem>
                                            <a
                                                href={ `${document.baseURI}platform/${url}` }
                                                onClick={ (event) => this.onLaunchClick(event, name, url, title) }
                                            >
                                                <Split gutter="sm" className="ins-c-navigation">
                                                    <SplitItem>
                                                        Launch
                                                    </SplitItem>
                                                    <SplitItem>
                                                        <ArrowRightIcon size="sm" />
                                                    </SplitItem>
                                                </Split>
                                            </a>
                                        </StackItem>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </GridItem>
                    )) }
                </Grid>
            </Fragment>
        );
    }
}

Body.propTypes = {
    technologies: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
        body: PropTypes.node,
        tite: PropTypes.node,
        isPreview: PropTypes.bool
    }))
};

Body.defaultProps = {
    technologies: []
};

function mapStateToProps({ technologies }) {
    return {
        technologies: technologies && technologies.aciveTechnologies
    };
}

export default connect(mapStateToProps)(Body);
