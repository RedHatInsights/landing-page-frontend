import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import React from 'react';

import IconLightBulb from './icon-light-bulb';

const RecommendationsPanel = () => {
  return (
    <Grid hasGutter className="land-l-grid-second-panel pf-u-mx-lg pf-u-mt-lg">
      <GridItem sm={12} md={6}>
        <Card className="land-c-card" isFlat>
          <CardBody className="land-c-card__body">
            <Sidebar hasGutter>
              <SidebarPanel width={{ default: 'width_25' }}>
                <IconLightBulb />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component={TextVariants.h6}>
                    NEW! Sign up for App Studio Service Preview
                  </Text>
                  <Text component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.n
                    venenatis est rutrum vitae.
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
        <Card className="land-c-card" isFlat>
          <CardBody className="land-c-card__body">
            <Sidebar hasGutter>
              <SidebarPanel width={{ default: 'width_25' }}>
                <IconLightBulb />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component={TextVariants.h6}>Red Hat Insights</Text>
                  <Text component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.n
                    venenatis est rutrum vitae.
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
        <Card className="land-c-card" isFlat>
          <CardBody className="land-c-card__body">
            <Sidebar hasGutter>
              <SidebarPanel width={{ default: 'width_25' }}>
                <IconLightBulb />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component={TextVariants.h6}>
                    Ansible Automation Platform
                  </Text>
                  <Text component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.n
                    venenatis est rutrum vitae.
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem sm={12} md={6}>
        <Card className="land-c-card" isFlat>
          <CardBody className="land-c-card__body">
            <Sidebar hasGutter>
              <SidebarPanel width={{ default: 'width_25' }}>
                <IconLightBulb />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component={TextVariants.h6}>
                    Application and Data Services
                  </Text>
                  <Text component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.n
                    venenatis est rutrum vitae.
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
        <Card className="land-c-card" isFlat>
          <CardBody className="land-c-card__body">
            <Sidebar hasGutter>
              <SidebarPanel width={{ default: 'width_25' }}>
                <IconLightBulb />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component={TextVariants.h6}>
                    Openshift and Kubernetes Stuff
                  </Text>
                  <Text component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.n
                    venenatis est rutrum vitae.
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default RecommendationsPanel;
