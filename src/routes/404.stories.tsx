import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import NotFound from './404';

const meta: Meta<typeof NotFound> = {
  title: 'Routes/404',
  component: NotFound,
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: '404: We lost that page' }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { name: /Let's find you a new one/ }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: 'Return to homepage' }),
    ).toBeInTheDocument();
  },
};
