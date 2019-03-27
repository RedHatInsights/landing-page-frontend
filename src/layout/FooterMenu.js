import React from 'react';
import { Grid, GridItem, TextContent, Text, TextVariants, Split, SplitItem, List, ListItem } from '@patternfly/react-core';
import { OutlinedPaperPlaneIcon } from '@patternfly/react-icons';

import './FooterMenu.scss';

const FooterMenu = () => (
    <div className='ins-c-footer__menu'>
        <Grid sm={ 12 } md={ 3 } gutter="lg">
            <GridItem>
                <TextContent>
                    <Text component={ TextVariants.h2 }>Support and resources</Text>
                </TextContent>
                <List variant='grid'>
                    <ListItem><a href="#">View documentation</a></ListItem>
                    <ListItem><a href="#">Open a support case</a></ListItem>
                    <ListItem><a href="#">Contact customer service</a></ListItem>
                </List>
            </GridItem>
            <GridItem>
                <TextContent>
                    <Text component={ TextVariants.h2 }>About</Text>
                </TextContent>
                <a href="#">Red Hat Insights</a>
                <a href="#">Red Hat Smart Management</a>
                <a href="#">Red Hat Hybrid CloudManagement</a>
                <a href="#">Red Hat OpenShift</a>
            </GridItem>
            <GridItem>
                <TextContent>
                    <Text component={ TextVariants.h2 }>Feedback</Text>
                </TextContent>
                <Split gutter="md">
                    <SplitItem><OutlinedPaperPlaneIcon size='xl' className="ins-c-icon__active"/></SplitItem>
                    <SplitItem isMain><a href="#" className='ins-m-inline'>Tell us about your experience</a> using
                    Red Hat Cloud Services software, and how we can improve.</SplitItem>
                </Split>
            </GridItem>
        </Grid>
    </div>
);

export default FooterMenu;
