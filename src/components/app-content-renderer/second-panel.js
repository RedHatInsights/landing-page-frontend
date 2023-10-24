import {
  Card,
  CardBody,
  Gallery,
  Icon,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
  Title,
  TitleSizes,
} from '@patternfly/react-core';
import React from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import RecentlyVisited from '../recently-visited/recently-visited';
import { ScalprumComponent } from '@scalprum/react-core';
import { isIntEnv } from '../../utils/getEnv';

const SecondPanel = () => {
  return (
    <Sidebar className="land-c-sidebar pf-u-background-color-100">
      <SidebarContent className="pf-u-background-color-200 pf-u-pt-md pf-u-pb-2xl-on-md">
        <Stack>
          <StackItem className="land-l-stack__item-favorites pf-u-px-xl pf-u-pb-lg">
            <ScalprumComponent scope="chrome" module="./LandingNavFavorites" />
          </StackItem>
          <StackItem className="pf-u-background-color-100">
            <Title
              headingLevel="h3"
              size={TitleSizes['2xl']}
              className="pf-u-px-xl pf-u-py-md"
            >
              Get started with Hybrid Cloud Console capabilities
            </Title>
            <Gallery
              minWidths={{
                default: '100%',
                md: '350px',
              }}
              hasGutter
              className="pf-u-px-xl pf-u-background-color-100"
            >
              <Card isFlat>
                <CardBody>
                  <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                    <img
                      src="https://console.redhat.com/apps/frontend-assets/console-landing/insights.svg"
                      alt="Red Hat Insights"
                    />
                    <Text
                      component="p"
                      className="pf-u-font-size-lg pf-u-mt-md"
                    >
                      Red Hat Insights
                    </Text>
                    <Text component="p" className="pf-u-flex-grow-1">
                      Proactively assess, secure and stabilize the
                      business-critical applications you scale from your Red Hat
                      platforms.
                    </Text>
                    <Text component="p">
                      Manage
                      <Link to="/insights/" className="pf-u-px-sm">
                        RHEL
                      </Link>
                      |
                      {!isIntEnv && (
                        <>
                          <Link to="/ansible/advisor" className="pf-u-px-sm">
                            Ansible
                          </Link>
                          &nbsp;|&nbsp;
                          <Link to="/openshift/insights" className="pf-u-pl-sm">
                            OpenShift
                          </Link>
                        </>
                      )}
                    </Text>
                  </TextContent>
                </CardBody>
              </Card>
              {!isIntEnv && (
                <Card isFlat>
                  <CardBody>
                    <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                      <img
                        src="https://console.redhat.com/apps/frontend-assets/console-landing/datascience.svg"
                        alt="Red Hat Openshift AI"
                      />
                      <Text
                        component="p"
                        className="pf-u-font-size-lg pf-u-mt-md"
                      >
                        Red Hat Openshift AI
                      </Text>
                      <Text component="p" className="pf-u-flex-grow-1">
                        Create, train, and serve artificial intelligence and
                        machine learning (AI/ML) models.
                      </Text>
                      <Text component="p">
                        <Link to="/application-services/data-science">
                          Try it out now
                          <Icon className="pf-u-ml-sm" isInline>
                            <ArrowRightIcon />
                          </Icon>
                        </Link>
                      </Text>
                    </TextContent>
                  </CardBody>
                </Card>
              )}
              <Card isFlat>
                <CardBody>
                  <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                    <img
                      src="https://console.redhat.com/apps/frontend-assets/console-landing/openshift.svg"
                      alt="OpenShift"
                    />
                    <Text
                      component="p"
                      className="pf-u-font-size-lg pf-u-mt-md"
                    >
                      Red Hat OpenShift
                    </Text>
                    <Text component="p" className="pf-u-flex-grow-1">
                      Build, run, scale container-based applications - now with
                      developer tools, CI/CD, and release management.
                    </Text>
                    <Text component="p">
                      <Link
                        to={isIntEnv ? '/openshift' : '/openshift/overview'}
                      >
                        Manage Openshift Clusters
                        <Icon className="pf-u-ml-sm" isInline>
                          <ArrowRightIcon />
                        </Icon>
                      </Link>
                    </Text>
                  </TextContent>
                </CardBody>
              </Card>
              {!isIntEnv && (
                <Card isFlat>
                  <CardBody>
                    <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                      <img
                        src="https://console.redhat.com/apps/frontend-assets/console-landing/edge1.svg"
                        alt="Edge Management"
                      />
                      <Text
                        component="p"
                        className="pf-u-font-size-lg pf-u-mt-md"
                      >
                        Edge Management
                      </Text>
                      <Text component="p">
                        Keep your systems protected, available, and operating
                        efficiently. Update all your RHEL for Edge systems with
                        secure, over-the-air updates.
                      </Text>
                      <Text component="p">
                        <Link to="/edge/fleet-management">
                          Manage at the edge
                          <Icon className="pf-u-ml-sm" isInline>
                            <ArrowRightIcon />
                          </Icon>
                        </Link>
                      </Text>
                    </TextContent>
                  </CardBody>
                </Card>
              )}
              {!isIntEnv && (
                <Card isFlat>
                  <CardBody>
                    <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                      <img
                        src="https://console.redhat.com/apps/frontend-assets/console-landing/ansible.svg"
                        alt="Ansible Automation Platform"
                      />
                      <Text
                        component="p"
                        className="pf-u-font-size-lg pf-u-mt-md"
                      >
                        Ansible Automation Platform
                      </Text>
                      <Text component="p" className="pf-u-flex-grow-1">
                        Create, share, and manage automations - from development
                        and operations to security and network teams.
                      </Text>
                      <Text component="p">
                        <Link to="/ansible/ansible-dashboard">
                          Automate everything
                          <Icon className="pf-u-ml-sm" isInline>
                            <ArrowRightIcon />
                          </Icon>
                        </Link>
                      </Text>
                    </TextContent>
                  </CardBody>
                </Card>
              )}
              {!isIntEnv && (
                <Card isFlat>
                  <CardBody>
                    <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                      <img
                        src="https://console.redhat.com/apps/frontend-assets/console-landing/subs.svg"
                        alt="subscription management"
                      />
                      <Text
                        component="p"
                        className="pf-u-font-size-lg pf-u-mt-md"
                      >
                        Subscription Management
                      </Text>
                      <Text component="p" className="pf-u-flex-grow-1">
                        View and manage your Red Hat subscriptions.
                      </Text>
                      <Text component="p">
                        <Link to="/insights/subscriptions/inventory#SIDs=&tags=">
                          View all subscriptions
                          <Icon className="pf-u-ml-sm" isInline>
                            <ArrowRightIcon />
                          </Icon>
                        </Link>
                      </Text>
                    </TextContent>
                  </CardBody>
                </Card>
              )}
              {!isIntEnv && (
                <Card isFlat>
                  <CardBody>
                    <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                      <img
                        src="https://console.redhat.com/apps/frontend-assets/console-landing/acs.svg"
                        alt="cluster security cloud service"
                      />
                      <Text
                        component="p"
                        className="pf-u-font-size-lg pf-u-mt-md"
                      >
                        Red Hat Advanced Cluster Security Cloud Service
                      </Text>
                      <Text component="p" className="pf-u-flex-grow-1">
                        Fully hosted software as a service for protecting cloud
                        native applications and Kubernetes.
                      </Text>
                      <Text component={TextVariants.p}>
                        <Link to="/application-services/acs/overview">
                          Get Started Now
                          <Icon className="pf-u-ml-sm" isInline>
                            <ArrowRightIcon />
                          </Icon>
                        </Link>
                      </Text>
                    </TextContent>
                  </CardBody>
                </Card>
              )}
              {!isIntEnv && (
                <Card isFlat>
                  <CardBody>
                    <TextContent className="pf-u-display-flex pf-u-flex-direction-column">
                      <img
                        src="https://console.redhat.com/apps/frontend-assets/console-landing/generic.svg"
                        alt="quay"
                      />
                      <Text
                        component="p"
                        className="pf-u-font-size-lg pf-u-mt-md"
                      >
                        Quay.io
                      </Text>
                      <Text component="p" className="pf-u-flex-grow-1">
                        Build, analyze, and distribute your container images.
                      </Text>
                      <Text component={TextVariants.p}>
                        <Link to="/quay/organization">
                          Start managing your container images
                          <Icon className="pf-u-ml-sm" isInline>
                            <ArrowRightIcon />
                          </Icon>
                        </Link>
                      </Text>
                    </TextContent>
                  </CardBody>
                </Card>
              )}
            </Gallery>
          </StackItem>
        </Stack>
      </SidebarContent>
      <SidebarPanel
        width={{ lg: 'width_25', md: 'width_33', sm: 'width_100' }}
        className="pf-u-m-xl pf-u-m-0-on-md pf-u-background-color-200"
      >
        <RecentlyVisited />
      </SidebarPanel>
    </Sidebar>
  );
};

export default SecondPanel;
