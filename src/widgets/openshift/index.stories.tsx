import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import OpenShiftWidget from './';

const meta: Meta<typeof OpenShiftWidget> = {
  title: 'Widgets/OpenShift',
  component: OpenShiftWidget,
};

export default meta;
type Story = StoryObj<typeof OpenShiftWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Build, run, and scale container-based applications - now with developer tools, CI/CD, and release management.',
      ),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /OpenShift/ }),
    ).toHaveAttribute('href', '/openshift');
  },
};
