import type { Preview } from '@storybook/react-vite';
import '@patternfly/react-core/dist/styles/base.css';
import '@redhat-cloud-services/hcc-storybook-hub/css/storybook.css';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  HccStorybookProvider,
  hccPreviewDefaults,
} from '@redhat-cloud-services/hcc-storybook-hub';

const preview: Preview = {
  ...hccPreviewDefaults,
  decorators: [
    (Story, { parameters }) => (
      <HccStorybookProvider
        bundle="landing-page"
        app="landing"
        environment={parameters.chrome?.environment ?? 'production'}
        featureFlags={parameters.featureFlags}
      >
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </HccStorybookProvider>
    ),
  ],
  parameters: {
    ...hccPreviewDefaults.parameters,
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Documentation', 'Widgets', 'Routes', 'Components', '*'],
      },
    },
    chrome: {
      environment: 'production',
    },
    featureFlags: {},
  },
};

export default preview;
