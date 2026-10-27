import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, sb, waitFor, within } from 'storybook/test';

import { messageCatalogs } from './messageCatalogs';
import { IntlMessagesProvider } from './IntlMessagesProvider';
import { AcsWidget } from '../widgets/AcsWidget';

// The catalog module is mocked so stories can inject test catalogs per
// locale; the widget under test is real, exercising the full production
// path: provider -> lazy catalog -> widget's defineMessages + useIntl.
sb.mock(import('./messageCatalogs'));

const ACS_BODY = 'landing.acs.body';
const ACS_LINK = 'landing.acs.linkTitle';
const EN: Record<string, string> = {
  [ACS_BODY]:
    'Fully hosted software as a service for protecting cloud-native applications and Kubernetes.',
  [ACS_LINK]: 'RHACS Cloud Service',
};

function catalog(translations: Record<string, string>) {
  const messages = Object.fromEntries(
    Object.entries(EN).map(([k, v]) => [
      k,
      k in translations
        ? translations[k]
        : `\u{1F6A8} UNTRANSLATED \u{1F6A8} ${v}`,
    ]),
  );
  return () => Promise.resolve({ default: messages });
}

/**
 * A real widget, rendered under the provider at an explicit locale.
 * The preview's MemoryRouter and en-locale provider stay as ancestors —
 * react-intl providers nest legally and the inner one wins.
 */
function WidgetInLocale({ locale }: { locale: string }) {
  return (
    <IntlMessagesProvider locale={locale}>
      <AcsWidget />
    </IntlMessagesProvider>
  );
}

const meta: Meta = {
  title: 'Components/IntlMessagesProvider',
  tags: ['i18n'],
  component: IntlMessagesProvider,
};

export default meta;
type Story = StoryObj;

export const EnglishDefault: Story = {
  render: () => <WidgetInLocale locale="en" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(EN[ACS_BODY])).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: EN[ACS_LINK] }),
    ).toHaveAttribute('href', '/openshift/acs/overview');
  },
};

export const French: Story = {
  beforeEach: () => {
    messageCatalogs.fr = catalog({
      [ACS_BODY]:
        'Service logiciel entièrement hébergé pour protéger les applications cloud-native et Kubernetes.',
      [ACS_LINK]: 'RHACS Cloud Service (FR)',
    });
  },
  render: () => <WidgetInLocale locale="fr" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      const link = canvas.queryByRole('link', {
        name: 'RHACS Cloud Service (FR)',
      });
      expect(link).toBeInTheDocument();
    });
    await expect(
      await canvas.findByText(
        'Service logiciel entièrement hébergé pour protéger les applications cloud-native et Kubernetes.',
      ),
    ).toBeInTheDocument();
  },
};

export const Japanese: Story = {
  beforeEach: () => {
    messageCatalogs.ja = catalog({
      [ACS_BODY]:
        'クラウドネイティブアプリケーションと Kubernetes を保護する完全ホスト型の SaaS。',
      [ACS_LINK]: 'RHACS Cloud Service (JA)',
    });
  },
  render: () => <WidgetInLocale locale="ja" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      const link = canvas.queryByRole('link', {
        name: 'RHACS Cloud Service (JA)',
      });
      expect(link).toBeInTheDocument();
    });
  },
};

export const Korean: Story = {
  beforeEach: () => {
    messageCatalogs.ko = catalog({
      [ACS_BODY]:
        '클라우드 네이티브 애플리케이션과 Kubernetes를 보호하는 완전 호스팅 SaaS.',
      [ACS_LINK]: 'RHACS Cloud Service (KO)',
    });
  },
  render: () => <WidgetInLocale locale="ko" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      const link = canvas.queryByRole('link', {
        name: 'RHACS Cloud Service (KO)',
      });
      expect(link).toBeInTheDocument();
    });
  },
};

export const Chinese: Story = {
  beforeEach: () => {
    messageCatalogs['zh-CN'] = catalog({
      [ACS_BODY]: '用于保护云原生应用和 Kubernetes 的完全托管 SaaS。',
      [ACS_LINK]: 'RHACS Cloud Service (ZH)',
    });
  },
  render: () => <WidgetInLocale locale="zh-CN" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      const link = canvas.queryByRole('link', {
        name: 'RHACS Cloud Service (ZH)',
      });
      expect(link).toBeInTheDocument();
    });
  },
};

export const MissingTranslationShowsMarker: Story = {
  // French catalog translates only the link title — the body must surface
  // the untranslated marker, not silent English.
  beforeEach: () => {
    messageCatalogs.fr = catalog({
      [ACS_LINK]: 'RHACS Cloud Service (FR)',
    });
  },
  render: () => <WidgetInLocale locale="fr" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(async () => {
      const body = canvas.queryByText(/UNTRANSLATED/);
      expect(body).toBeInTheDocument();
      expect(body?.textContent).toContain(EN[ACS_BODY]);
    });
  },
};

export const SlowNetworkLoad: Story = {
  beforeEach: () => {
    messageCatalogs.fr = () =>
      new Promise((resolve) =>
        setTimeout(() => {
          const messages = Object.fromEntries(
            Object.entries(EN).map(([k, v]) => [k, `[FR] ${v}`]),
          );
          resolve({ default: messages });
        }, 2000),
      );
  },
  render: () => <WidgetInLocale locale="fr" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(
      async () => {
        const link = canvas.queryByRole('link', {
          name: `[FR] ${EN[ACS_LINK]}`,
        });
        expect(link).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  },
};

export const FailedLoadFallsBackToDefaultMessage: Story = {
  beforeEach: () => {
    messageCatalogs.fr = () => Promise.reject(new Error('Network error'));
  },
  render: () => <WidgetInLocale locale="fr" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(EN[ACS_BODY])).toBeInTheDocument();
  },
};

export const UnknownLocaleFallsBackToDefaultMessage: Story = {
  render: () => <WidgetInLocale locale="xx-XX" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(EN[ACS_BODY])).toBeInTheDocument();
  },
};
