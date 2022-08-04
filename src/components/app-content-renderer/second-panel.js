import {
  Card,
  CardBody,
  Flex,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import React from 'react';

import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon';

const SecondPanel = () => {
  return (
    <Flex className="land-l-second-panel pf-u-mx-xl-on-sm pf-u-mx-3xl-on-md pf-u-mt-2xl">
      <Flex className="pagetitle">
        <Title
          headingLevel="h3"
          size={TitleSizes['2xl']}
          className="pf-u-text-align-right pf-u-pb-md"
        >
          Hybrid Cloud Console Services
        </Title>
      </Flex>
      <Flex direction={{ default: 'column', md: 'row' }}>
        <Card isFlat>
          <CardBody>
            <Sidebar orientation="split" hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/background-images/landing-page-2022/Icon-Red_Hat-Cloud_Native_Development-A-Red-RGB.svg"
                  alt="Application and Data Services"
                />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component="p" className="title">
                    Application and Data Services
                  </Text>
                  <Text component="p" className="body">
                    Configure, monitor, optimize, and orchestrate applications
                    and data services on demand in the console.
                  </Text>
                  <Text component="a">
                    More&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
        <Card isFlat>
          <CardBody>
            <Sidebar orientation="split" hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/background-images/landing-page-2022/Product_Icon-Red_Hat-OpenShift-RGB.svg"
                  alt="Openshift"
                />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component="p" className="title">
                    OpenShift
                  </Text>
                  <Text component="p" className="body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.n
                    venenatis est rutrum vitae.
                  </Text>
                  <Text component="a">
                    More&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
      </Flex>
      <Flex direction={{ default: 'column', md: 'row' }}>
        <Card isFlat>
          <CardBody>
            <Sidebar orientation="split" hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/background-images/landing-page-2022/Icon-Red_Hat-Insights-RGB.svg"
                  alt="Red Hat Insights"
                />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component="p" className="title">
                    Red Hat Insights
                  </Text>
                  <Text component="p" className="body">
                    Secure and stabilize the business-critical applications you
                    scale from your Red Hat Linux Platform.
                  </Text>
                  <Text component="a">
                    More&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
        <Card isFlat>
          <CardBody>
            <Sidebar orientation="split" hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/background-images/landing-page-2022/Icon-Red_Hat-Edge-A-Red-RGB.svg"
                  alt="Edge Management"
                />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component="p" className="title">
                    Edge Management
                  </Text>
                  <Text component="p" className="body">
                    Provides controls and information to keep systems protected,
                    available, and operating efficiently. Update all your RHEL
                    for Edge systems with secure, over-the-air updates.
                  </Text>
                  <Text component="a">
                    More&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
      </Flex>

      <Flex direction={{ default: 'column', md: 'row' }}>
        <Card isFlat>
          <CardBody>
            <Sidebar orientation="split" hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/background-images/landing-page-2022/Product_Icon-Red_Hat-Ansible-RGB.svg"
                  alt="Ansible Automation Platform"
                />
              </SidebarPanel>
              <SidebarContent>
                <TextContent>
                  <Text component="p" className="title">
                    Ansible Automation Platform
                  </Text>
                  <Text component="p" className="body">
                    Enable users across an organization to create, share, and
                    manage automation-from development and operations to
                    secruity and network teams.
                  </Text>
                  <Text component="a">
                    More&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default SecondPanel;
