import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';

const AcsWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={5}
        body="Fully hosted software as a service for protecting cloud-native applications and Kubernetes."
        linkTitle="RHACS Cloud Service"
        url="/application-services/acs/overview"
      />
    </>
  );
};

export default AcsWidget;
