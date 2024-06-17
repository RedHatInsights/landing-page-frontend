import React, { Fragment } from 'react';
import { useFlag } from '@unleash/proxy-client-react';

import '../components/app-content-renderer/styles/panels.scss';

import FirstPanel from '../components/app-content-renderer/first-panel';
import SecondPanel from '../components/app-content-renderer/second-panel';
import { ScalprumComponent } from '@scalprum/react-core';
import classNames from 'classnames';

import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const Landing = () => {
  const scope = 'widgetLayout';
  const { isBeta } = useChrome();
  const widgetLayoutLandingPageEnabled =
    (isBeta() && useFlag('platform.landing-page.widgetization')) ||
    (!isBeta() && useFlag('platform.landing-page.widgetization-stable'));
  return (
    <div
      className={classNames(
        'land-c-page-content pf-v5-u-background-color-200 pf-v5-u-display-flex pf-v5-u-flex-direction-column',
        scope
      )}
    >
      <Fragment>
        {widgetLayoutLandingPageEnabled ? null : <FirstPanel />}
        {widgetLayoutLandingPageEnabled ? null : <SecondPanel />}
        {widgetLayoutLandingPageEnabled ? (
          <ScalprumComponent
            fallback={null}
            LoadingComponent={() => <></>}
            scope={scope}
            module="./WidgetLayout"
          />
        ) : null}
      </Fragment>
    </div>
  );
};

export default Landing;
