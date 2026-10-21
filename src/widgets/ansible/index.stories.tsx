import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import AnsibleWidget from './';

const meta: Meta<typeof AnsibleWidget> = {
  title: 'Widgets/Ansible',
  component: AnsibleWidget,
};

export default meta;
type Story = StoryObj<typeof AnsibleWidget>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        'Create, share, and manage automations - from development and operations, to security and network teams.',
      ),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: /Ansible/ })).toHaveAttribute(
      'href',
      '/ansible/ansible-dashboard',
    );
  },
};
