import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';
import './simple-service-widget.scss';

const AcsWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={5}
        body="Fully hosted software as a service for protecting cloud-native applications and Kubernetes."
        linkTitle="Advanced Cluster Management"
        url="/application-services/acs/overview"
      />
    </>
  );
};

export default AcsWidget;
