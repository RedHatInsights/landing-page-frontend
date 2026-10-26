import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import Landing from './Landing';

/**
 * Landing is the feature this repo exists for: the composition root of the
 * console's home page. Its contract is the federation wiring — it mounts
 * widgetLayout's layout engine with the right scope, module, and layout
 * type, plus a loading fallback while the remote chunk streams in.
 *
 * The scalprum loader is stubbed (.storybook/mocks/scalprum.tsx) so the
 * story asserts THIS repo's composition, not the federation runtime.
 */
const meta: Meta<typeof Landing> = {
  title: 'Routes/Landing',
  component: Landing,
};

export default meta;
type Story = StoryObj<typeof Landing>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // the composition mounts widgetLayout's layout engine
    const stub = await canvas.findByTestId(
      'scalprum-stub',
      {},
      { timeout: 5000 },
    );
    await expect(stub).toHaveAttribute('data-scope', 'widgetLayout');
    await expect(stub).toHaveAttribute('data-module', './WidgetLayout');
  },
};

export const WithLayoutType: Story = {
  args: {
    layoutType: 'custom-layout',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // layoutType flows through to the remote mount
    const stub = await canvas.findByTestId(
      'scalprum-stub',
      {},
      { timeout: 5000 },
    );
    await expect(stub).toHaveAttribute('data-layout-type', 'custom-layout');
  },
};
