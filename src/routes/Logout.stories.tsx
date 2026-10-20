import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import Logout from './Logout';

const meta: Meta<typeof Logout> = {
  title: 'Routes/Logout',
  component: Logout,
};

export default meta;
type Story = StoryObj<typeof Logout>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'You have logged out.' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Take me home' }),
    ).toBeInTheDocument();
  },
};
