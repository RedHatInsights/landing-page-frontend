import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';

import { SimpleServiceWidget } from './SimpleServiceWidget';

const messages = defineMessages({
  body: {
    id: 'landing.acs.body',
    description: 'Landing page ACS widget card body',
    defaultMessage:
      'Fully hosted software as a service for protecting cloud-native applications and Kubernetes.',
  },
  linkTitle: {
    id: 'landing.acs.linkTitle',
    description: 'Landing page ACS widget link label',
    defaultMessage: 'RHACS Cloud Service',
  },
});

export const AcsWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={5}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        url="/openshift/acs/overview"
      />
    </>
  );
};

const AcsWidgetEntry: React.FunctionComponent = () => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <AcsWidget />
    </IntlMessagesProvider>
  );
};

export default AcsWidgetEntry;
