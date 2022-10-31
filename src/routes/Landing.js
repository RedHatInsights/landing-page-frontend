import React, { Fragment } from 'react';
import { Split, SplitItem } from '@patternfly/react-core';

import './Landing.scss';
import '../components/app-content-renderer/styles/panels.scss';

// Mockup console landing page
import FirstPanel from '../components/app-content-renderer/first-panel';
import SecondPanel from '../components/app-content-renderer/second-panel';
import FooterTraditional from '../layout/FooterTraditional';

const Landing = () => {
  return (
    <Split className="land-c-page-layout">
      <SplitItem className="land-c-page-content pf-u-display-flex pf-u-flex-direction-column">
        <Fragment>
          <FirstPanel />
          <SecondPanel />
          <FooterTraditional />
        </Fragment>
      </SplitItem>
    </Split>
  );
};

export default Landing;
