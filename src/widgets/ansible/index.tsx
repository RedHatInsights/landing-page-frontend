import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { SimpleServiceWidget } from '../simple-service-widget';

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

const AnsibleWidget: React.FunctionComponent = () => {
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

export default AnsibleWidget;
