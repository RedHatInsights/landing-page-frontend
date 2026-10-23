import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { SimpleServiceWidget } from '../simple-service-widget';

const messages = defineMessages({
  body: {
    id: 'landing.edge.body',
    description: 'Landing page Edge widget card body',
    defaultMessage:
      'Keep your systems protected, available, and operating efficiently. Update all your RHEL for Edge systems with secure, over-the-air updates.',
  },
  linkTitle: {
    id: 'landing.edge.linkTitle',
    description: 'Landing page Edge widget link label',
    defaultMessage: 'Edge',
  },
});

const EdgeWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={3}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        url="/edge/fleet-management"
      />
    </>
  );
};

export default EdgeWidget;
