import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import RecentlyVisited from './RecentlyVisited';

const meta: Meta<typeof RecentlyVisited> = {
  title: 'Widgets/RecentlyVisited',
  component: RecentlyVisited,
};

export default meta;
type Story = StoryObj<typeof RecentlyVisited>;

// useLastVisited is mocked at the module level via .storybook/mocks/chrome.ts
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Advisor recommendations'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('OpenShift cluster list'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Insights')).toBeInTheDocument();
    const link = canvas.getByRole('link', { name: 'Advisor recommendations' });
    await expect(link).toHaveAttribute('href', '/insights/advisor');
  },
};
