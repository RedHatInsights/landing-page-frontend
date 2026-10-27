import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';
import { useFlag } from '@unleash/proxy-client-react';

import { SimpleServiceWidget } from './SimpleServiceWidget';

const messages = defineMessages({
  body: {
    id: 'landing.rhel.body',
    description: 'Landing page RHEL widget card body',
    defaultMessage:
      'Proactively assess, secure, and stabilize the business-critical services that you scale from your RHEL systems.',
  },
  linkTitle: {
    id: 'landing.rhel.linkTitle',
    description: 'Landing page RHEL widget link label',
    defaultMessage: 'Insights for RHEL',
  },
  linkTitleRebrand: {
    id: 'landing.rhel.linkTitleRebrand',
    description:
      'Landing page RHEL widget link label, lightspeed-rebrand variant',
    defaultMessage: 'RHEL',
  },
});

export const RhelWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  const lightSpeedRebrand = useFlag('platform.lightspeed-rebrand');

  return (
    <>
      <SimpleServiceWidget
        id={0}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(
          lightSpeedRebrand ? messages.linkTitleRebrand : messages.linkTitle,
        )}
        url="/insights/"
      />
    </>
  );
};

const RhelWidgetEntry: React.FunctionComponent = () => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <RhelWidget />
    </IntlMessagesProvider>
  );
};

export default RhelWidgetEntry;
