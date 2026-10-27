import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import ExploreCapabilities from './ExploreCapabilities';

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
    // every card links to its destination, not just "some link exists"
    await expect(
      canvas.getByRole('link', { name: /Try OpenShift on AWS/ }),
    ).toHaveAttribute('href', '/openshift/overview/rosa');
    await expect(
      canvas.getByRole('link', {
        name: /Try our products in the Developer Sandbox/,
      }),
    ).toHaveAttribute('href', 'https://sandbox.redhat.com');
    await expect(
      canvas.getByRole('link', { name: /Analyze RHEL environments/ }),
    ).toHaveAttribute('href', '/insights/dashboard#SIDs=&tags=');
    await expect(
      canvas.getByRole('link', { name: /Convert from CentOS to RHEL/ }),
    ).toHaveAttribute(
      'href',
      '/insights/tasks/available/convert-to-rhel-analysis?quickstart=insights-tasks-pre-conversion',
    );
    await expect(
      canvas.getByRole('link', {
        name: /Migration Advisor: VMware to Openshift/,
      }),
    ).toHaveAttribute('href', '/openshift/migration-advisor');
  },
};
