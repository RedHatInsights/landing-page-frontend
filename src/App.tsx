import React, { Suspense } from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { defineMessages, useIntl } from 'react-intl';
import { Bullseye } from '@patternfly/react-core/dist/dynamic/layouts/Bullseye';
import { Spinner } from '@patternfly/react-core/dist/dynamic/components/Spinner';
import '@patternfly/patternfly/utilities/Text/text.css';

import Landing from './features/landing/Landing';

/**
 * The module chrome mounts at exactly `/` (CRD: app `landing`, module
 * `./RootApp`, route `/` exact). Chrome owns routing: any location change
 * away from `/` stops matching chrome's route for this app and unmounts
 * it — there is nothing to route to in here. The app's entire job is the
 * Landing composition that mounts widgetLayout's layout engine.
 */
const messages = defineMessages({
  documentTitle: {
    id: 'landing.documentTitle',
    description: 'Browser tab title for the landing page',
    defaultMessage: 'Hybrid Cloud Console Home',
  },
});

const App: React.FC<{ layoutType?: string }> = ({ layoutType }) => {
  const chrome = useChrome();
  const intl = useIntl();

  chrome?.updateDocumentTitle?.(
    intl.formatMessage(messages.documentTitle),
    false,
  );

  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner size="xl" />
        </Bullseye>
      }
    >
      <Landing layoutType={layoutType} />
    </Suspense>
  );
};

export default App;
