import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import IconHourglass from './icon-hourglass';

const meta: Meta<typeof IconHourglass> = {
  title: 'Components/IconHourglass',
  component: IconHourglass,
};

export default meta;
type Story = StoryObj<typeof IconHourglass>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelector('svg.IconHourglass'),
    ).toBeInTheDocument();
  },
};
