import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';

export const EdgeWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={3}
        body="Keep your systems protected, available, and operating efficiently. Update all your RHEL for Edge systems with secure, over-the-air updates."
        linkTitle="Edge"
        url="/edge/fleet-management"
      />
    </>
  );
};
