import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import RhelWidget from './rhel-widget';

const meta: Meta<typeof RhelWidget> = {
  title: 'Widgets/RhelWidget',
  component: RhelWidget,
};

export default meta;
type Story = StoryObj<typeof RhelWidget>;

export const Default: Story = {
  // feature flags default to off: linkTitle renders as 'Insights for RHEL'
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Proactively assess, secure, and stabilize the business-critical services that you scale from your RHEL systems.',
      ),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /Insights for RHEL/ }),
    ).toHaveAttribute('href', '/insights/');
  },
};

export const LightspeedRebrand: Story = {
  parameters: {
    featureFlags: { 'platform.lightspeed-rebrand': true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('link', { name: 'RHEL' })).toHaveAttribute(
      'href',
      '/insights/',
    );
  },
};
