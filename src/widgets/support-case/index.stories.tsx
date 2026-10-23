import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { HttpResponse, http } from 'msw';

import SupportCaseWidget from './';

const meta: Meta<typeof SupportCaseWidget> = {
  title: 'Widgets/SupportCaseWidget',
  component: SupportCaseWidget,
};

export default meta;
type Story = StoryObj<typeof SupportCaseWidget>;

const cases = [
  {
    id: '1',
    caseNumber: '03926115',
    summary: 'Cannot access cluster',
    lastModifiedById: 'jdoe',
    severity: '2 (High)',
    status: 'Waiting on Customer',
    productFamily: 'OpenShift',
  },
  {
    id: '2',
    caseNumber: '03926189',
    summary: 'Node flapping in cluster',
    lastModifiedById: 'jdoe',
    severity: '1 (Urgent)',
    status: 'Waiting on Red Hat',
    productFamily: 'OpenShift',
  },
];

export const WithCases: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('https://api.access.redhat.com/support/v3/cases/filter', () =>
          HttpResponse.json({ cases }),
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // the widget fetches cases async — findBy* polls until the table renders
    await expect(await canvas.findByText('03926115')).toBeInTheDocument();
    await expect(canvas.getByText('Cannot access cluster')).toBeInTheDocument();
    await expect(canvas.getByText('Waiting on Red Hat')).toBeInTheDocument();
  },
};

export const NoCases: Story = {
  parameters: {
    msw: {
      handlers: [
        http.post('https://api.access.redhat.com/support/v3/cases/filter', () =>
          HttpResponse.json({ cases: [] }),
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('No open support cases'),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("We can't find any active support cases opened by you."),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Open a support case' }),
    ).toHaveAttribute(
      'href',
      'https://access.redhat.com/support/cases/#/case/new/get-support?caseCreate=true',
    );
  },
};
