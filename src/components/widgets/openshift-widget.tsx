import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';

const OpenShiftWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={1}
        body="Build, run, and scale container-based applications - now with developer tools, CI/CD, and release management."
        linkTitle="OpenShift"
        url="/openshift"
      />
    </>
  );
};

export default OpenShiftWidget;
