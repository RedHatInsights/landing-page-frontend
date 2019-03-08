import React from 'react';
import { Card, CardBody, Bullseye, Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';
import { BookIcon, OutlinedEnvelopeIcon, ChatIcon } from '@patternfly/react-icons';

const Foot = () => (
    <Card className="ins-c-content__footer">
        <Bullseye>
            <CardBody>
                <Bullseye>
                    <TextContent>
                        <Text component={ TextVariants.h2 } className="ins-m-bold">
                            Services &amp; Support
                        </Text>
                    </TextContent>
                </Bullseye>
                <Grid sm={ 12 } md={ 4 } gutter="lg">
                    <GridItem>
                        <TextContent>
                            <Bullseye><BookIcon size="xl" className="ins-c-icon__active" /></Bullseye>
                            <Bullseye><Text component={ TextVariants.h2 }>Get documentation</Text></Bullseye>
                            <Bullseye>
                                <Text component={ TextVariants.small } className="ins-c-text__regular-size ins-m-centered">
                                    This is a statement about docs.
                                    This is a statement about docs.
                                    This is a statement about docs.
                                </Text>
                            </Bullseye>
                            <Bullseye><a href="#">View Documentation</a></Bullseye>
                        </TextContent>
                    </GridItem>
                    <GridItem>
                        <TextContent>
                            <Bullseye><OutlinedEnvelopeIcon size="xl" className="ins-c-icon__active" /></Bullseye>
                            <Bullseye><Text component={ TextVariants.h2 }>Open a support case</Text></Bullseye>
                            <Bullseye>
                                <Text component={ TextVariants.small } className="ins-c-text__regular-size ins-m-centered">
                                    This is a statement about support cases.
                                    This is a statement about support cases.
                                    This is a statement about support cases.
                                </Text>
                            </Bullseye>
                            <Bullseye><a href="#">Open a support case</a></Bullseye>
                        </TextContent>
                    </GridItem>
                    <GridItem>
                        <TextContent>
                            <Bullseye><ChatIcon size="xl" className="ins-c-icon__active" /></Bullseye>
                            <Bullseye><Text component={ TextVariants.h2 }>Contact customer service</Text></Bullseye>
                            <Bullseye>
                                <Text component={ TextVariants.small } className="ins-c-text__regular-size ins-m-centered">
                                    This is a statement about customer service.
                                    This is a statement about customer service.
                                    This is a statement about customer service.
                                </Text>
                            </Bullseye>
                            <Bullseye><a href="#">Contact customer service</a></Bullseye>
                        </TextContent>
                    </GridItem>
                </Grid>
            </CardBody>
        </Bullseye>
    </Card>
);

export default Foot;
