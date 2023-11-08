import React, { Fragment } from 'react';

import '../components/app-content-renderer/styles/panels.scss';

import FirstPanel from '../components/app-content-renderer/first-panel';
import SecondPanel from '../components/app-content-renderer/second-panel';
import VirtualAssistant from "../components/app-content-renderer/virtual-assistant";

const Landing = () => {
  return (
    <div className="land-c-page-content pf-u-display-flex pf-u-flex-direction-column">
      <Fragment>
        <VirtualAssistant />
        <FirstPanel />
        <SecondPanel />
      </Fragment>
    </div>
  );
};

export default Landing;
