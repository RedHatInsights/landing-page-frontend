import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import Icon404 from './icon-404';

const meta: Meta<typeof Icon404> = {
  title: 'Components/Icon404',
  component: Icon404,
};

export default meta;
type Story = StoryObj<typeof Icon404>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvasElement.querySelector('svg#Icon404'),
    ).toBeInTheDocument();
    await expect(canvas.getByTitle('404path-not-found')).toBeInTheDocument();
  },
};
