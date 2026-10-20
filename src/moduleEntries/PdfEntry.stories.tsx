import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import PdfEntry from './PdfEntry';

const meta: Meta<typeof PdfEntry> = {
  title: 'Components/PdfEntry',
  component: PdfEntry,
};

export default meta;
type Story = StoryObj<typeof PdfEntry>;

const services = [
  [
    { id: 'openshift', description: 'OpenShift Container Platform' },
    { id: 'insights', description: 'Red Hat Insights' },
  ],
  [
    { id: 'ansible', description: 'Red Hat Ansible Automation Platform' },
    { id: 'cost-management', description: 'Cost Management' },
  ],
];

export const Default: Story = {
  args: {
    asyncData: {
      data: services,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Services' }),
    ).toBeInTheDocument();
    await expect(canvas.getByText('ID')).toBeInTheDocument();
    await expect(canvas.getByText('Description')).toBeInTheDocument();
    await expect(
      canvas.getByText('OpenShift Container Platform'),
    ).toBeInTheDocument();
    await expect(canvas.getByText('Red Hat Insights')).toBeInTheDocument();
  },
};
