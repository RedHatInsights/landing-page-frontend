import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';

import { SimpleServiceWidget } from './SimpleServiceWidget';

const messages = defineMessages({
  body: {
    id: 'landing.quay.body',
    description: 'Landing page Quay widget card body',
    defaultMessage: 'Build, analyze, and distribute your container images.',
  },
  linkTitle: {
    id: 'landing.quay.linkTitle',
    description: 'Landing page Quay widget link label',
    defaultMessage: 'Quay.io',
  },
});

export const QuayWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={4}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        url="/quay/organization"
      />
    </>
  );
};

const QuayWidgetEntry: React.FunctionComponent = () => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <QuayWidget />
    </IntlMessagesProvider>
  );
};

export default QuayWidgetEntry;
