import React, { Fragment } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import { ScalprumComponent } from '@scalprum/react-core';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const Landing = () => {
  const scope = 'widgetLayout';
  const { isBeta } = useChrome();
  const widgetLayoutLandingPageEnabled =
    (isBeta() && useFlag('platform.landing-page.widgetization')) ||
    (!isBeta() && useFlag('platform.landing-page.widgetization-stable'));
  return (
    <Fragment>
      {widgetLayoutLandingPageEnabled ? (
        <ScalprumComponent
          fallback={null}
          LoadingComponent={() => <></>}
          scope={scope}
          module="./WidgetLayout"
        />
      ) : null}
    </Fragment>
  );
};

export default Landing;
