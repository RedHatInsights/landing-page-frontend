import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { SimpleServiceWidget } from './SimpleServiceWidget';

const meta: Meta<typeof SimpleServiceWidget> = {
  title: 'Widgets/SimpleServiceWidget',
  component: SimpleServiceWidget,
};

export default meta;
type Story = StoryObj<typeof SimpleServiceWidget>;

export const InternalLink: Story = {
  args: {
    id: 1,
    body: 'Build, deploy, and manage applications on Red Hat OpenShift.',
    linkTitle: 'OpenShift',
    url: '/openshift/overview',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Build, deploy, and manage applications on Red Hat OpenShift.',
      ),
    ).toBeInTheDocument();
    const link = canvas.getByRole('link', { name: /OpenShift/ });
    await expect(link).toHaveAttribute('href', '/openshift/overview');
  },
};

export const ExternalLink: Story = {
  args: {
    id: 2,
    body: 'A fully hosted platform for protecting cloud-native applications.',
    linkTitle: 'External service',
    url: 'https://example.com/service',
    isExternal: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('link', { name: /External service/ }),
    ).toHaveAttribute('href', 'https://example.com/service');
  },
};
