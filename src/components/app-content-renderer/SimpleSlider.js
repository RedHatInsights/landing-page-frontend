import React from 'react';
import Slider from 'react-slick';
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
} from '@patternfly/react-core';

import './styles/slick.scss';
import './styles/slick-theme.scss';

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="land-c-slick-slider-wrapper pf-u-mx-md-on-md">
      <Slider {...settings} className="pf-u-p-sm pf-u-pb-0">
        <div>
          <Sidebar
            orientation="split"
            className="pf-u-flex-direction-column pf-u-mb-sm"
            hasGutter
          >
            <SidebarContent className="pf-u-p-lg pf-u-h-100">
              <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                <Text component="h3">Red Hat OpenShift Service on AWS</Text>
                <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                  Easily provision your ROSA cluster with AWS Security Token
                  Service in the new web interface with the same secure and
                  capable managed experience provided in the command-line
                  interface.
                </Text>
                <Text
                  component="a"
                  href="https://console.redhat.com/openshift/create/rosa/wizard"
                >
                  <Button variant="danger">Try out ROSA today</Button>
                </Text>
              </TextContent>
            </SidebarContent>
            <SidebarPanel
              width={{ default: 'width_33' }}
              className="slide-1 pf-u-align-self-stretch"
            ></SidebarPanel>
          </Sidebar>
        </div>

        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-u-p-lg pf-u-h-100">
              <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                <Text component="h3">
                  Develop in the sandbox with the Red Hat Developer program
                </Text>
                <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                  Try Red Hat OpenShift technologies without setup or
                  configuration for free with your Red Hat Developer account.
                </Text>
                <div>
                  <Text
                    component="a"
                    href="https://console.redhat.com/openshift/sandbox"
                    className="pf-u-pr-sm pf-u-mb-sm-on-sm"
                  >
                    <Button variant="danger" className="pf-u-pr-sm pf-u-mb-sm">
                      Build apps on the sandbox
                    </Button>
                  </Text>
                  <Text
                    component="a"
                    href="https://developers.redhat.com/about"
                  >
                    <Button
                      href="https://developers.redhat.com/about"
                      variant="tertiary"
                      className="land-c-button-custom"
                    >
                      Learn about the program
                    </Button>
                  </Text>
                </div>
              </TextContent>
            </SidebarContent>
            <SidebarPanel
              width={{ default: 'width_33' }}
              className="slide-2  pf-u-align-self-stretch"
            ></SidebarPanel>
          </Sidebar>
        </div>

        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-u-p-lg pf-u-h-100">
              <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                <Text component="h3">Red Hat Insights</Text>
                <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                  With Red Hat Insights, you can continuously analyze platforms
                  and applications from the console to better manage your hybrid
                  cloud environments.
                </Text>
                <Text
                  component="a"
                  href="https://console.redhat.com/insights/dashboard"
                >
                  <Button variant="danger">Identify and resolve risks</Button>
                </Text>
              </TextContent>
            </SidebarContent>
            <SidebarPanel
              width={{ default: 'width_33' }}
              className="slide-3  pf-u-align-self-stretch"
            ></SidebarPanel>
          </Sidebar>
        </div>

        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-u-p-lg pf-u-h-100">
              <TextContent className="pf-u-display-flex pf-u-flex-direction-column pf-u-h-100 pf-u-color-light-100">
                <Text component="h3">Red Hat Marketplace</Text>
                <Text component="p" className="pf-u-pb-sm pf-u-flex-grow-1">
                  Try, purchase, and deploy software across clouds.
                </Text>
                <Text component="a" href="https://marketplace.redhat.com/en-us">
                  <Button variant="danger">Learn more</Button>
                </Text>
              </TextContent>
            </SidebarContent>
            <SidebarPanel
              width={{ default: 'width_33' }}
              className="slide-4  pf-u-align-self-stretch"
            ></SidebarPanel>
          </Sidebar>
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
