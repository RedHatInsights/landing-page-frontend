import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
} from '@patternfly/react-core';

import useCurrentUser from '../useCurrentUser';
import './styles/slick.scss';
import './styles/slick-theme.scss';
import { isIntEnv } from '../../utils/getEnv';

function SimpleSlider() {
  const { currentUser } = useCurrentUser();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="land-c-slick-slider-wrapper pf-u-pb-sm pf-u-px-xl-on-md">
      <TextContent>
        <Text
          component="h1"
          className="pf-u-pb-md pf-u-pl-sm pf-u-color-light-100"
        >
          Hi, {currentUser.username}.
          <br />
          Welcome to your Hybrid Cloud Console.
        </Text>
      </TextContent>
      <Slider {...settings} className="pf-u-p-sm pf-u-pb-0">
        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-u-p-lg pf-u-h-100 pf-m-no-background">
              <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                <Text component="h3">Red Hat OpenShift Service on AWS</Text>
                <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                  Easily provision your ROSA cluster with AWS Security Token
                  Service in the new web interface with the same secure and
                  capable managed experience provided in the command-line
                  interface.
                </Text>
                <Text component="p">
                  <Link to="/openshift/create/rosa/getstarted">
                    <Button variant="danger">Try out ROSA today</Button>
                  </Link>
                </Text>
              </TextContent>
            </SidebarContent>
            <SidebarPanel
              width={{ default: 'width_25' }}
              className="slide-1 pf-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
            ></SidebarPanel>
          </Sidebar>
        </div>

        {!isIntEnv && (
          <div>
            <Sidebar orientation="split" hasGutter>
              <SidebarContent className="pf-u-p-lg pf-u-h-100 pf-m-no-background">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                  <Text component="h3">
                    Develop in the sandbox with the Red Hat Developer program
                  </Text>
                  <Text component="p" className="pf-u-flex-grow-1">
                    Try Red Hat OpenShift technologies without setup or
                    configuration for free with your Red Hat Developer account.
                    <Text
                      component="a"
                      className="pf-u-active-color-400 pf-u-ml-sm"
                      href="https://developers.redhat.com/about"
                    >
                      Learn about the program.
                    </Text>
                  </Text>
                  <Text component="p" className="pf-u-pr-sm pf-u-mb-0">
                    <Link to="/openshift/sandbox">
                      <Button variant="danger" className="pf-u-pr-sm">
                        Build apps on the sandbox
                      </Button>
                    </Link>
                  </Text>
                </TextContent>
              </SidebarContent>
              <SidebarPanel
                width={{ default: 'width_25' }}
                className="slide-2 pf-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
              ></SidebarPanel>
            </Sidebar>
          </div>
        )}

        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-u-p-lg pf-u-h-100 pf-m-no-background">
              <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                <Text component="h3">Red Hat Insights for RHEL</Text>
                <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                  With Red Hat Insights, you can continuously analyze platforms
                  and applications from the console to better manage your hybrid
                  cloud environments.
                </Text>
                <Text component="p">
                  <Link to="/insights/dashboard">
                    <Button variant="danger">Identify and resolve risks</Button>
                  </Link>
                </Text>
              </TextContent>
            </SidebarContent>
            <SidebarPanel
              width={{ default: 'width_25' }}
              className="slide-3  pf-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
            ></SidebarPanel>
          </Sidebar>
        </div>

        {!isIntEnv && (
          <div>
            <Sidebar orientation="split" hasGutter>
              <SidebarContent className="pf-u-p-lg pf-u-h-100 pf-m-no-background">
                <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                  <Text component="h3">Red Hat Marketplace</Text>
                  <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                    Try, purchase, and deploy software across clouds.
                  </Text>
                  <Text
                    component="a"
                    href="https://marketplace.redhat.com/en-us"
                  >
                    <Button variant="danger">Learn more</Button>
                  </Text>
                </TextContent>
              </SidebarContent>
              <SidebarPanel
                width={{ default: 'width_25' }}
                className="slide-4  pf-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
              ></SidebarPanel>
            </Sidebar>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
