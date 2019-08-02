import React from 'react';
import {
    Grid,
    GridItem,
    PageSection,
    TextContent,
    Text,
    TextVariants,
    Split,
    SplitItem
} from '@patternfly/react-core';
import { PaperPlaneAltIcon } from '@patternfly/react-icons';

import './FooterMenu.scss';

const FooterMenu = () => (
    <PageSection className='ins-c-footer__menu pf-m-no-fill'>
        <Grid sm={ 12 } md={ 3 } gutter="lg">
            <GridItem>
                <TextContent>
                    <Text component={ TextVariants.h2 }>Support and resources</Text>
                </TextContent>
                <a href="https://access.redhat.com/support">Get support</a>
                <a href="https://access.redhat.com/support/customer-service">Contact customer service</a>
            </GridItem>
            <GridItem>
                <TextContent>
                    <Text component={ TextVariants.h2 }>About</Text>
                </TextContent>
                <a href="https://access.redhat.com/products/red-hat-insights#getstarted">Red Hat Insights</a>
                <a href="https://access.redhat.com/products/cloud_management_services_for_rhel">Red Hat Smart Management</a>
                { /*
                    TODO: Unhide at a later point
                    <a href="#">Red Hat Hybrid Cloud Management</a>
                */ }
                <a href="https://www.openshift.com/">Red Hat OpenShift</a>
            </GridItem>
            <GridItem>
                <TextContent>
                    <Text component={ TextVariants.h2 }>Feedback</Text>
                </TextContent>
                <Split gutter="md">
                    <SplitItem><PaperPlaneAltIcon size='xl' className="ins-c-icon__active"/></SplitItem>
                    <SplitItem isFilled><a href="javascript:;" className='ins-m-inline' tabIndex='0'>Tell us about your experience</a> using
                    Red Hat Cloud Services software, and how we can improve.</SplitItem>
                </Split>
            </GridItem>
        </Grid>
    </PageSection>
);

export default FooterMenu;
