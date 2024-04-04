import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';
import './simple-service-widget.scss';

const OpenShiftAiWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={6}
        body="Create, train, and serve artificial intelligence and machine learning (AI/ML) models."
        linkTitle="OpenShift AI"
        url="/application-services/data-science"
      />
    </>
  );
};

export default OpenShiftAiWidget;
