import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import ImageBuilderWidget from './ImageBuilderWidget';

const meta: Meta<typeof ImageBuilderWidget> = {
  title: 'Widgets/ImageBuilder',
  component: ImageBuilderWidget,
};

export default meta;
type Story = StoryObj<typeof ImageBuilderWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Create customized system images for disks, VMs, and cloud platforms. Image Builder automates configurations, saving you time and ensuring consistent, deployment-ready images every time.',
      ),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: /Images/ })).toHaveAttribute(
      'href',
      '/insights/image-builder',
    );
  },
};
