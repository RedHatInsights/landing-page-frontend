import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import ExploreCapabilities from './explore-capabilities';

const meta: Meta<typeof ExploreCapabilities> = {
  title: 'Widgets/ExploreCapabilities',
  component: ExploreCapabilities,
};

export default meta;
type Story = StoryObj<typeof ExploreCapabilities>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Get started with a tour'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Try OpenShift on AWS')).toBeInTheDocument();
    await expect(
      canvas.getByText('Try our products in the Developer Sandbox'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Convert from CentOS to RHEL'),
    ).toBeInTheDocument();
    // every card links somewhere
    await expect(canvas.getAllByRole('link').length).toBeGreaterThanOrEqual(6);
  },
};
