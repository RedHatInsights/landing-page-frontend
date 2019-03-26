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
    Title,
    CardFooter
} from '@patternfly/react-core';
import { ArrowRightIcon, BinocularsIcon } from '@patternfly/react-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Body.scss';

const Body = ({ technologies }) => (
    <Fragment>
        <Grid sm={ 12 } md={ 6 } lg={ 3 } gutter="md">
            { technologies.map(({ icon, iconProps, title, url, body, isPreview, id }, key) => (
                <GridItem key={ key }>
                    <a className='ins-c-card__link' href={ `./${url}` } aria-label={ `Go to ${title}` }>
                        <Card className="ins-c-application-info" application-id={ id }>
                            <CardHeader>
                                <Stack gutter='sm'>
                                    <StackItem>
                                        <img
                                            className="ins-c-application-info__logo"
                                            aria-hidden
                                            src={ icon }
                                            alt={ `${title} logo` }
                                            { ...iconProps } />
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
                                    <StackItem>
                                        <span className='ins-m-gray'>{ body }</span>
                                    </StackItem>
                                </Stack>
                            </CardBody>
                            <CardFooter>
                                <Split gutter="sm" className="ins-c-open-card">
                                    <SplitItem>
                                        Open
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
