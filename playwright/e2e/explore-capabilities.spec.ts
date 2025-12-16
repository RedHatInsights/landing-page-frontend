import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Explore Capabilities widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1500 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
  });

  test('shows correct content and CTAs for each tab', async ({ page }) => {
    test.setTimeout(90000);
    const landing = new LandingPage(page);
    const widget = landing.widget('landing-exploreCapabilities-widget');
    await expect(widget).toBeVisible();

    const widgetTestData = [
      {
        tabHeading: 'Get started with the Hybrid Cloud Console',
        contentHeader: 'Take a tour of the Console',
        buttonText: 'Start the guided tour',
        expectedLinkDest: null,
      },
      {
        tabHeading: 'Try OpenShift with AWS',
        contentHeader: 'Get started with Red Hat OpenShift Service on AWS (ROSA)',
        buttonText: 'Try ROSA',
        expectedLinkDest: null,
      },
      {
        tabHeading: 'Develop on the OpenShift Sandbox',
        contentHeader: 'Develop in the sandbox with the Red Hat Developer program',
        buttonText: 'Explore the sandbox',
        expectedLinkDest: 'https://sandbox.redhat.com',
      },
      {
        tabHeading: 'Analyze your environments',
        contentHeader: 'Continuously analyze with Red Hat Insights',
        buttonText: 'Identify and resolve risks',
        expectedLinkDest: '/insights/dashboard',
      },
      {
        tabHeading: 'Connect to your subscriptions',
        contentHeader: 'Empower your buying decisions with data',
        buttonText: 'Explore subscriptions',
        expectedLinkDest: '/subscriptions/inventory',
      },
      {
        tabHeading: 'Convert your CentOS systems to RHEL',
        contentHeader: 'Convert your CentOS systems to Red Hat Enterprise Linux',
        buttonText: 'Run a pre-conversion analysis',
        expectedLinkDest: '/insights/tasks/available/convert-to-rhel-analysis',
      },
      {
        tabHeading: 'Configure your console',
        contentHeader: 'Customize your notification settings',
        buttonText: 'Configure settings',
        expectedLinkDest: '/settings/notifications',
      },
    ] as const;

    for (const item of widgetTestData) {
      await widget.scrollIntoViewIfNeeded();
      await expect(widget).toBeVisible();

      // Cypress clicked the base widget first; do the same to ensure tabs are active/focused.
      await widget.click({ trial: true }).catch(() => undefined);

      const tab = widget
        .getByRole('tab', { name: item.tabHeading })
        .or(widget.getByText(item.tabHeading));
      await tab.first().click({ timeout: 60000 });

      await expect(widget.getByText(item.contentHeader)).toBeVisible({ timeout: 60000 });

      const cta = widget.getByRole('link', { name: item.buttonText });
      await expect(cta).toBeVisible();

      if (!item.expectedLinkDest) continue;

      // External destinations are validated by href only (more stable than leaving console).
      if (item.expectedLinkDest.startsWith('http')) {
        await expect(cta).toHaveAttribute('href', new RegExp(item.expectedLinkDest));
        continue;
      }

      // Internal destinations are validated by actual navigation.
      await Promise.all([
        page.waitForURL((u) => u.href.includes(item.expectedLinkDest), { timeout: 60000 }),
        cta.click(),
      ]);

      await page.goBack({ waitUntil: 'domcontentloaded' });
      await expect(widget).toBeVisible();
    }
  });
});


