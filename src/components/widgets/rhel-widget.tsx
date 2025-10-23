import React from 'react';
import { SimpleServiceWidget } from './simple-service-widget';
import { useFlag } from '@unleash/proxy-client-react';

const RhelWidget: React.FunctionComponent = () => {
  const lightSpeedRebrand = useFlag('platform.lightspeed-rebrand');

  return (
    <>
      <SimpleServiceWidget
        id={0}
        body="Proactively assess, secure, and stabilize the business-critical services that you scale from your RHEL systems."
        linkTitle={lightSpeedRebrand ? 'RHEL' : 'Insights for RHEL'}
        url="/insights/"
      />
    </>
  );
};

export default RhelWidget;
