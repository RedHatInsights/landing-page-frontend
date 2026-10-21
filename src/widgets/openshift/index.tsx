import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { SimpleServiceWidget } from '../simple-service-widget';

const messages = defineMessages({
  body: {
    id: 'landing.openshift.body',
    description: 'Landing page OpenShift widget card body',
    defaultMessage:
      'Build, run, and scale container-based applications - now with developer tools, CI/CD, and release management.',
  },
  linkTitle: {
    id: 'landing.openshift.linkTitle',
    description: 'Landing page OpenShift widget link label',
    defaultMessage: 'OpenShift',
  },
});

const OpenShiftWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={1}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        url="/openshift"
      />
    </>
  );
};

export default OpenShiftWidget;
