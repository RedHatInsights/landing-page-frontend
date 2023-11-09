import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import {
  Sidebar,
  SidebarContent,
  SidebarPanel,
} from '@patternfly/react-core/dist/dynamic/components/Sidebar';
import {
  Text,
  TextContent,
} from '@patternfly/react-core/dist/dynamic/components/Text';

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
    <div className="land-c-slick-slider-wrapper pf-v5-u-pb-sm pf-v5-u-px-xl-on-md">
      <TextContent>
        <Text
          component="h1"
          className="pf-v5-u-pb-md pf-v5-u-pl-sm pf-v5-u-color-light-100"
        >
          Hi,
          {currentUser?.first_name && currentUser?.last_name
            ? ` ${currentUser.first_name} ${currentUser.last_name}`
            : currentUser?.username}
          <br />
          Welcome to your Hybrid Cloud Console.
        </Text>
      </TextContent>
      <Slider {...settings} className="pf-v5-u-p-sm pf-v5-u-pb-0">
        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-v5-u-p-lg pf-v5-u-h-100 pf-m-no-background">
              <TextContent className="pf-v5-u-display-flex pf-v5-u-flex-direction-column pf-v5-u-h-100 pf-v5-u-color-light-100">
                <Text component="h3">Red Hat OpenShift Service on AWS</Text>
                <Text
                  component="p"
                  className="pf-v5-u-pb-sm pf-v5-u-flex-grow-1"
                >
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
              className="slide-1 pf-v5-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
            >
              <Fragment />
            </SidebarPanel>
          </Sidebar>
        </div>

        {!isIntEnv && (
          <div>
            <Sidebar orientation="split" hasGutter>
              <SidebarContent className="pf-v5-u-p-lg pf-v5-u-h-100 pf-m-no-background">
                <TextContent className="pf-v5-u-display-flex pf-v5-u-flex-direction-column pf-v5-u-h-100 pf-v5-u-color-light-100">
                  <Text component="h3">
                    Develop in the sandbox with the Red Hat Developer program
                  </Text>
                  <Text component="p" className="pf-v5-u-flex-grow-1">
                    Try Red Hat OpenShift technologies without setup or
                    configuration for free with your Red Hat Developer account.
                    <Text
                      component="a"
                      className="pf-v5-u-active-color-400 pf-v5-u-ml-sm"
                      href="https://developers.redhat.com/about"
                    >
                      Learn about the program.
                    </Text>
                  </Text>
                  <Text component="p" className="pf-v5-u-pr-sm pf-v5-u-mb-0">
                    <Link to="/openshift/sandbox">
                      <Button variant="danger" className="pf-v5-u-pr-sm">
                        Build apps on the sandbox
                      </Button>
                    </Link>
                  </Text>
                </TextContent>
              </SidebarContent>
              <SidebarPanel
                width={{ default: 'width_25' }}
                className="slide-2 pf-v5-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
              >
                <Fragment />
              </SidebarPanel>
            </Sidebar>
          </div>
        )}

        <div>
          <Sidebar orientation="split" hasGutter>
            <SidebarContent className="pf-v5-u-p-lg pf-v5-u-h-100 pf-m-no-background">
              <TextContent className="pf-v5-u-display-flex pf-v5-u-flex-direction-column pf-v5-u-h-100 pf-v5-u-color-light-100">
                <Text component="h3">Red Hat Insights for RHEL</Text>
                <Text
                  component="p"
                  className="pf-v5-u-pb-sm pf-v5-u-flex-grow-1"
                >
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
              className="slide-3  pf-v5-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
            >
              <Fragment />
            </SidebarPanel>
          </Sidebar>
        </div>

        {!isIntEnv && (
          <div>
            <Sidebar orientation="split" hasGutter>
              <SidebarContent className="pf-v5-u-p-lg pf-v5-u-h-100 pf-m-no-background">
                <TextContent className="pf-v5-u-display-flex pf-v5-u-flex-direction-column pf-v5-u-h-100 pf-v5-u-color-light-100">
                  <Text component="h3">Red Hat Marketplace</Text>
                  <Text
                    component="p"
                    className="pf-v5-u-pb-sm pf-v5-u-flex-grow-1"
                  >
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
                className="slide-4  pf-v5-u-align-self-stretch pf-m-no-background ins-m-hide-on-md"
              >
                <Fragment />
              </SidebarPanel>
            </Sidebar>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
