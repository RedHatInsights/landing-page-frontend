import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';

import { SimpleServiceWidget } from './SimpleServiceWidget';

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

export const OpenShiftWidget: React.FunctionComponent = () => {
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

const OpenShiftWidgetEntry: React.FunctionComponent = () => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <OpenShiftWidget />
    </IntlMessagesProvider>
  );
};

export default OpenShiftWidgetEntry;
