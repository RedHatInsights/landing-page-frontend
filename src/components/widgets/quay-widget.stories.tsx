import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import QuayWidget from './quay-widget';

const meta: Meta<typeof QuayWidget> = {
  title: 'Widgets/Quay',
  component: QuayWidget,
};

export default meta;
type Story = StoryObj<typeof QuayWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Build, analyze, and distribute your container images.'),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: /Quay.io/ })).toHaveAttribute(
      'href',
      '/quay/organization',
    );
  },
};
