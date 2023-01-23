import React, { Fragment } from 'react';

import '../components/app-content-renderer/styles/panels.scss';

import FirstPanel from '../components/app-content-renderer/first-panel';
import SecondPanel from '../components/app-content-renderer/second-panel';

const Landing = () => {
  return (
    <div className="land-c-page-content pf-u-display-flex pf-u-flex-direction-column">
      <Fragment>
        <FirstPanel />
        <SecondPanel />
      </Fragment>
    </div>
  );
};

export default Landing;
