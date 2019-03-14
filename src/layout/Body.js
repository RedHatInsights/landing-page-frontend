import React, { Fragment } from 'react';
import {
    Card, CardHeader,
    CardBody,
    Split,
    SplitItem,
    Grid,
    Stack,
    StackItem,
    GridItem,
    TextContent,
    Text,
    TextVariants,
    CardFooter
} from '@patternfly/react-core';
import { ArrowRightIcon, BinocularsIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Body = ({ technologies }) => (
    <Fragment>
        <Grid sm={ 12 } md={ 6 } lg={ 3 } gutter="md">
            { technologies.map(({ icon, iconProps, title, url, body, isPreview }, key) => (
                <GridItem key={ key }>
                    <Card className="ins-c-application-info">
                        <CardHeader>
                            <img className="ins-c-application-info__logo" src={ icon } alt={ `${title} logo` } { ...iconProps } />
                        </CardHeader>
                        <CardBody>
                            <Stack>
                                <StackItem>
                                    <TextContent>
                                        <Text component={ TextVariants.h2 }>
                                            { title }
                                        </Text>
                                    </TextContent>
                                    { isPreview &&
                                        <div className="ins-m-tech-preview">
                                            <BinocularsIcon size="sm" /> Tech Preview
                                        </div>
                                    }
                                </StackItem>
                                <StackItem>
                                    <span className='ins-m-gray'>{ body }</span>
                                </StackItem>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <a href={ `./${url}` } >
                                <Split gutter="sm" className="ins-c-navigation">
                                    <SplitItem>
                                        Open
                                    </SplitItem>
                                    <SplitItem>
                                        <ArrowRightIcon size="sm" />
                                    </SplitItem>
                                </Split>
                            </a>
                        </CardFooter>
                    </Card>
                </GridItem>
            )) }
        </Grid>
    </Fragment>
);

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
