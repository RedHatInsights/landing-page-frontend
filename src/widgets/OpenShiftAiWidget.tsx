import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { IntlMessagesProvider, useChromeLocale } from '../i18n';

import { SimpleServiceWidget } from './SimpleServiceWidget';

const messages = defineMessages({
  body: {
    id: 'landing.openshift-ai.body',
    description: 'Landing page OpenShift AI widget card body',
    defaultMessage:
      'Create, train, and serve artificial intelligence and machine learning (AI/ML) models.',
  },
  linkTitle: {
    id: 'landing.openshift-ai.linkTitle',
    description: 'Landing page OpenShift AI widget link label',
    defaultMessage: 'OpenShift AI',
  },
});

export const OpenShiftAiWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={6}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        isExternal
        url="https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai/trial"
      />
    </>
  );
};

const OpenShiftAiWidgetEntry: React.FunctionComponent = () => {
  const locale = useChromeLocale();
  return (
    <IntlMessagesProvider locale={locale}>
      <OpenShiftAiWidget />
    </IntlMessagesProvider>
  );
};

export default OpenShiftAiWidgetEntry;
