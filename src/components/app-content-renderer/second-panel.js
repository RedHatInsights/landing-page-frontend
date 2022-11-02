import {
  Card,
  CardBody,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import React from 'react';

import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';

const SecondPanel = () => {
  return (
    <div className="land-l-second-panel pf-u-background-color-100 pf-u-px-xl pf-u-pt-md pf-u-pb-2xl">
      <Title headingLevel="h3" size={TitleSizes['2xl']} className="pf-u-py-md">
        Get started with Hybrid Cloud console capabilities.
      </Title>
      <div className="land-l-card-container">
        <Card isFlat>
          <CardBody>
            <Sidebar className="pf-u-flex-direction-column" hasGutter>
              <SidebarPanel className="pf-u-box-shadow-none">
                <img
                  src="https://console.redhat.com/apps/frontend-assets/console-landing/services.svg"
                  alt="Application and Data Services"
                />
              </SidebarPanel>
              <SidebarContent className="pf-u-m-0 pf-u-mt-sm pf-u-h-100">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100">
                  <Text component="p" className="pf-u-font-size-lg">
                    Application and Data Services
                  </Text>
                  <Text component="p" className="pf-u-flex-grow-1">
                    Configure, monitor, optimize, and orchestrate applications
                    and data services on demand.
                  </Text>
                  <Text
                    component="a"
                    href="https://console.redhat.com/application-services/overview"
                  >
                    Explore services &nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>

        <Card isFlat>
          <CardBody>
            <Sidebar hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/console-landing/openshift.svg"
                  alt="Openshift"
                />
              </SidebarPanel>
              <SidebarContent className="pf-u-m-0 pf-u-mt-sm">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100">
                  <Text component="p" className="pf-u-font-size-lg">
                    OpenShift
                  </Text>
                  <Text component="p" className="pf-u-flex-grow-1">
                    Build, run, scale container-based applications -- now with
                    developer tools, CI/CD, and release management.
                  </Text>
                  <Text
                    component="a"
                    href="https://console.redhat.com/openshift/overview"
                  >
                    Scale your applications &nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>

        <Card isFlat>
          <CardBody>
            <Sidebar hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/console-landing/insights.svg"
                  alt="Red Hat Insights"
                />
              </SidebarPanel>
              <SidebarContent className="pf-u-m-0 pf-u-mt-sm pf-u-h-100">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100">
                  <Text component="p" className="pf-u-font-size-lg">
                    Red Hat Insights
                  </Text>
                  <Text component="p" className="pf-u-flex-grow-1">
                    Secure and stabilize the business-critical applications you
                    scale from your Red Hat Enterprise Linux Platform.
                  </Text>
                  <Text
                    component="a"
                    href="https://console.redhat.com/insights/dashboard"
                  >
                    Manage RHEL&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>

        <Card isFlat>
          <CardBody>
            <Sidebar hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/console-landing/edge.svg"
                  alt="Edge Management"
                />
              </SidebarPanel>
              <SidebarContent className="pf-u-m-0 pf-u-mt-sm pf-u-h-100">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100">
                  <Text component="p" className="pf-u-font-size-lg">
                    Edge Management
                  </Text>
                  <Text component="p" className="pf-u-flex-grow-1">
                    Keep your systems protected, available, and operating
                    efficiently. Update all your RHEL for Edge systems with
                    secure, over-the-air updates.
                  </Text>
                  <Text
                    component="a"
                    href="https://console.redhat.com/edge/fleet-management"
                  >
                    Manage at the edge&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>

        <Card isFlat>
          <CardBody>
            <Sidebar hasGutter>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/console-landing/ansible.svg"
                  alt="Ansible Automation Platform"
                />
              </SidebarPanel>
              <SidebarContent className="pf-u-m-0 pf-u-mt-sm pf-u-h-100">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100">
                  <Text component="p" className="pf-u-font-size-lg">
                    Ansible Automation Platform
                  </Text>
                  <Text component="p" className="pf-u-flex-grow-1">
                    Create, share, and manage automations - from development and
                    operations to security and network teams.
                  </Text>
                  <Text
                    component="a"
                    href="https://console.redhat.com/edge/ansible-dashboard"
                  >
                    Automate everything&nbsp;&nbsp;
                    <ArrowRightIcon />
                  </Text>
                </TextContent>
              </SidebarContent>
            </Sidebar>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SecondPanel;
