import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  supportCaseEmptyHandlers,
  supportCaseHandlers,
} from '../data/mocks/support-case.handlers';
import { DEFAULT_SUPPORT_CASES } from '../data/mocks/support-case.fixtures';
import SupportCaseWidget from './SupportCaseWidget';

const [FIRST_CASE, SECOND_CASE] = DEFAULT_SUPPORT_CASES;

const meta: Meta<typeof SupportCaseWidget> = {
  title: 'Widgets/SupportCaseWidget',
  component: SupportCaseWidget,
};

export default meta;
type Story = StoryObj<typeof SupportCaseWidget>;

export const WithCases: Story = {
  parameters: {
    msw: { handlers: supportCaseHandlers() },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // the widget fetches cases async — findBy* polls until the table renders
    await expect(
      await canvas.findByText(FIRST_CASE.caseNumber),
    ).toBeInTheDocument();
    await expect(canvas.getByText(FIRST_CASE.summary)).toBeInTheDocument();
    await expect(canvas.getByText(SECOND_CASE.status)).toBeInTheDocument();
  },
};

export const NoCases: Story = {
  parameters: {
    msw: { handlers: supportCaseEmptyHandlers() },
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
