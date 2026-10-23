import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import AcsWidget from './';

const meta: Meta<typeof AcsWidget> = {
  title: 'Widgets/ACS',
  component: AcsWidget,
};

export default meta;
type Story = StoryObj<typeof AcsWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Fully hosted software as a service for protecting cloud-native applications and Kubernetes.',
      ),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /RHACS Cloud Service/ }),
    ).toHaveAttribute('href', '/openshift/acs/overview');
  },
};
