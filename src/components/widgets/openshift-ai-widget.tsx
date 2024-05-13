import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';

const OpenShiftAiWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={6}
        body="Create, train, and serve artificial intelligence and machine learning (AI/ML) models."
        linkTitle="OpenShift AI"
        url="https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai/trial"
        isExternal
      />
    </>
  );
};

export default OpenShiftAiWidget;
