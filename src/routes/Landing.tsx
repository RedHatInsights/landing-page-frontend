import React, { Fragment } from 'react';
import { useFlag } from '@unleash/proxy-client-react';
import { ScalprumComponent } from '@scalprum/react-core';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const Landing = ({ layoutType }: { layoutType?: string }) => {
  const scope = 'widgetLayout';
  const { isBeta } = useChrome();
  const widgetLayoutLandingPageEnabled =
    (isBeta() && useFlag('platform.landing-page.widgetization')) ||
    (!isBeta() && useFlag('platform.landing-page.widgetization-stable'));
  const props = {
    ...(layoutType && {layoutType: layoutType})
  };
  return (
    <Fragment>
      {widgetLayoutLandingPageEnabled ? (
        <ScalprumComponent
          fallback={null}
          LoadingComponent={() => <></>}
          scope={scope}
          module="./WidgetLayout"
          {...props}
        />
      ) : null}
    </Fragment>
  );
};

export default Landing;
