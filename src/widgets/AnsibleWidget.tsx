import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';

import { SimpleServiceWidget } from './SimpleServiceWidget';

const messages = defineMessages({
  body: {
    id: 'landing.ansible.body',
    description: 'Landing page Ansible widget card body',
    defaultMessage:
      'Create, share, and manage automations - from development and operations, to security and network teams.',
  },
  linkTitle: {
    id: 'landing.ansible.linkTitle',
    description: 'Landing page Ansible widget link label',
    defaultMessage: 'Ansible',
  },
});

export const AnsibleWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={2}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        url="/ansible/ansible-dashboard"
      />
    </>
  );
};

const AnsibleWidgetEntry: React.FunctionComponent = () => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <AnsibleWidget />
    </IntlMessagesProvider>
  );
};

export default AnsibleWidgetEntry;
