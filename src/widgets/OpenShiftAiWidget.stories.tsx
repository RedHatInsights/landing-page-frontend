import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import OpenShiftAiWidget from './OpenShiftAiWidget';

const meta: Meta<typeof OpenShiftAiWidget> = {
  title: 'Widgets/OpenShiftAi',
  component: OpenShiftAiWidget,
};

export default meta;
type Story = StoryObj<typeof OpenShiftAiWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Create, train, and serve artificial intelligence and machine learning (AI/ML) models.',
      ),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: /OpenShift AI/ }),
    ).toHaveAttribute(
      'href',
      'https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai/trial',
    );
  },
};
