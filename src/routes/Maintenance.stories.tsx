import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import Maintenance from './Maintenance';

const meta: Meta<typeof Maintenance> = {
  title: 'Routes/Maintenance',
  component: Maintenance,
};

export default meta;
type Story = StoryObj<typeof Maintenance>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Maintenance in progress'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        /console\.redhat\.com is currently undergoing scheduled maintenance/,
      ),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('We will be back soon. Thank you for your patience!'),
    ).toBeInTheDocument();
    const statusLink = canvas.getByRole('link', {
      name: /status\.redhat\.com/,
    });
    await expect(statusLink).toHaveAttribute(
      'href',
      'http://status.redhat.com/incidents/qw4mmmyzwzdg',
    );
    await expect(
      canvas.getByRole('link', { name: 'Return to homepage' }),
    ).toBeInTheDocument();
  },
};
