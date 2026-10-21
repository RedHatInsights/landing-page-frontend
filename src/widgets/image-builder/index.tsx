import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { SimpleServiceWidget } from '../simple-service-widget';

const messages = defineMessages({
  body: {
    id: 'landing.image-builder.body',
    description: 'Landing page Image Builder widget card body',
    defaultMessage:
      'Create customized system images for disks, VMs, and cloud platforms. Image Builder automates configurations, saving you time and ensuring consistent, deployment-ready images every time.',
  },
  linkTitle: {
    id: 'landing.image-builder.linkTitle',
    description: 'Landing page Image Builder widget link label',
    defaultMessage: 'Images',
  },
});

const ImageBuilderWidget: React.FunctionComponent = () => {
  const intl = useIntl();
  return (
    <>
      <SimpleServiceWidget
        id={3}
        body={intl.formatMessage(messages.body)}
        linkTitle={intl.formatMessage(messages.linkTitle)}
        url="/insights/image-builder"
      />
    </>
  );
};

export default ImageBuilderWidget;
