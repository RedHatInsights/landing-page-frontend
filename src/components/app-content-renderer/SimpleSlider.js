import React, { Component } from 'react';
import Slider from '../carousel/slider';
import { 
  Button,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
} from '@patternfly/react-core';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="land-c-slick-slider-wrapper pf-u-background-color-100 pf-u-p-2xl pf-u-mx-xl-on-sm pf-u-mx-3xl-on-md">
        <Slider {...settings}>
          <div>
            <Sidebar orientation="split" hasGutter>
              <SidebarContent>
                <TextContent>
                  <Text component="h3">
                    Red Hat OpenShift Service on AWS
                  </Text>
                  <Text component="p">
                    Description here
                  </Text>
                  <Text component="a">
                    <Button>Try now</Button>
                  </Text>
                </TextContent>
              </SidebarContent>
              <SidebarPanel>
                <img
                  src="https://console.redhat.com/apps/frontend-assets/background-images/landing-page-2022/Developer-Illustration-Keyart-1 copy.png"
                  alt="Application and Data Services"
                />
              </SidebarPanel>
            </Sidebar>
          </div>
          <div>
            <h3>Red Hat OpenShift Service on AWS</h3>
            <p>Description here</p>
            <br />
            <Button>Try now</Button>
          </div>
          <div>
            <h3>Red Hat OpenShift Service on AWS</h3>
            <p>Description here</p>
            <br />
            <Button>Try now</Button>
          </div>
          <div>
            <h3>Red Hat OpenShift Service on AWS</h3>
            <p>Description here</p>
            <br />
            <Button>Try now</Button>
          </div>
        </Slider>
      </div>
    );
  }
}
