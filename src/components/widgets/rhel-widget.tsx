import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';
import './simple-service-widget.scss';

const RhelWidget: React.FunctionComponent = () => {
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

export default RhelWidget;
