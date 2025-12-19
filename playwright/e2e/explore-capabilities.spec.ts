import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Explore Capabilities widget', () => {
  test.describe.configure({ timeout: 90000 });

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1500 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
  });

  test('shows correct content and CTAs for each tile', async ({ page }) => {
    const landing = new LandingPage(page);
    const widget = landing.widget('landing-exploreCapabilities-widget');
    await expect(widget).toBeVisible();

    const tileData = [
      {
        ouiaId: 'start-guided-tour-button',
        title: 'Get started with a tour',
        expectedHref: /\/?$/,
      },
      {
        ouiaId: 'try-rosa-button',
        title: 'Try OpenShift on AWS',
        expectedHref: /\/openshift\/overview\/rosa/,
      },
      {
        ouiaId: 'explore-sandbox-button',
        title: 'Try our products in the Developer Sandbox',
        expectedHref: /https:\/\/sandbox\.redhat\.com/,
      },
      {
        ouiaId: 'analyze-risk-button',
        title: 'Analyze RHEL environments',
        expectedHref: /\/insights\/dashboard/,
      },
      {
        ouiaId: 'cent-os-button',
        title: 'Convert from CentOS to RHEL',
        expectedHref: /\/insights\/tasks\/available\/convert-to-rhel-analysis/,
      },
    ] as const;

    for (const item of tileData) {
      const tile = widget.locator(
        `[data-ouia-component-id="${item.ouiaId}"]`,
      );
      await expect(tile).toBeVisible();
      await expect(tile).toContainText(item.title);

      // The link wraps the PF Card, so the <a> is an ancestor of the card element.
      const cta = tile.locator('xpath=ancestor::a[1]');
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute('href', item.expectedHref);
    }
  });
});


