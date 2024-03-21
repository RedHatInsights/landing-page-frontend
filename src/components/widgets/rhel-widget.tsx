import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';

export const RhelWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={0}
        body="Proactively assess, secure, and stabilize the business-critical services that you scale from your RHEL systems."
        linkTitle="Insights for Rhel"
        url="/insights/"
      />
    </>
  );
};
