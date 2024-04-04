import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';
import './simple-service-widget.scss';

const QuayWidget: React.FunctionComponent = () => {
  return (
    <>
      <SimpleServiceWidget
        id={4}
        body="Build, analyze, and distribute your container images."
        linkTitle="Quay.io"
        url="/quay/organization"
      />
    </>
  );
};

export default QuayWidget;
