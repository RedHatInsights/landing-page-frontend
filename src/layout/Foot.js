import React from 'react';
import { Card, CardBody, Bullseye, Grid, GridItem, TextContent, Text, TextVariants, Split, SplitItem } from '@patternfly/react-core';
import { OutlinedPaperPlaneIcon } from '@patternfly/react-icons';

const Foot = () => (
    <Card>
        <Bullseye>
            <CardBody>
                <Grid sm={ 12 } md={ 4 } gutter="lg">
                    <GridItem>
                        <TextContent>
                            <Text component={ TextVariants.h2 }>Support and resources</Text>
                            <div className="ins-c-navigational-link">
                                <a href="#">View Documentation</a>
                            </div>
                            <div className="ins-c-navigational-link">
                                <a href="#">Open a support case</a>
                            </div>
                            <div className="ins-c-navigational-link">
                                <a href="#">contact customer service</a>
                            </div>
                        </TextContent>
                    </GridItem>
                    <GridItem>
                        <TextContent>
                            <Text component={ TextVariants.h2 }>About</Text>
                            <div className="ins-c-navigational-link">
                                <a href="#">Red Hat Insights</a>
                            </div>
                            <div className="ins-c-navigational-link">
                                <a href="#">Red Hat Smart Management</a>
                            </div>
                            <div className="ins-c-navigational-link">
                                <a href="#">Red Hat Hybrid CloudManagement</a>
                            </div>
                            <div className="ins-c-navigational-link">
                                <a href="#">Red Hat OpenShift</a>
                            </div>
                        </TextContent>
                    </GridItem>
                    <GridItem>
                        <TextContent>
                            <Text component={ TextVariants.h2 }>Feedback</Text>
                        </TextContent>
                        <Split gutter="md">
                            <SplitItem><OutlinedPaperPlaneIcon size="xl" className="ins-c-icon__active"/></SplitItem>
                            <SplitItem isMain><a href="#">Tell us about your experience</a> using
                            Red Hat Cloud Services sofware, and how we can improve.</SplitItem>
                        </Split>
                    </GridItem>
                </Grid>
            </CardBody>
        </Bullseye>
    </Card>
);

export default Foot;
