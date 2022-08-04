import React, { Component } from 'react';
import Slider from '../carousel/slider';
import { Button } from '@patternfly/react-core';

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
      <div className="land-c-slick-slider-wrapper pf-u-mx-xl-on-sm pf-u-mx-3xl-on-md">
        <Slider {...settings}>
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
