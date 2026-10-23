import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import EdgeWidget from './edge-widget';

const meta: Meta<typeof EdgeWidget> = {
  title: 'Widgets/Edge',
  component: EdgeWidget,
};

export default meta;
type Story = StoryObj<typeof EdgeWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Keep your systems protected, available, and operating efficiently. Update all your RHEL for Edge systems with secure, over-the-air updates.',
      ),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: /Edge/ })).toHaveAttribute(
      'href',
      '/edge/fleet-management',
    );
  },
};
