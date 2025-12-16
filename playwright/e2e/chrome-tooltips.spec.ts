import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Chrome tooltips (Settings / Help)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
  });

  test('tooltip appears for settings and help icons', async ({ page }) => {
    // These are chrome-level elements (not landing-page app code) but are included
    // in the migration plan.
    const settingsButton = page.locator('.tooltip-button-settings-cy');
    const helpButton = page.locator('.tooltip-button-help-cy');

    await expect(settingsButton).toBeVisible();
    await settingsButton.hover();
    await expect(page.locator('.tooltip-inner-settings-cy')).toContainText('Settings');

    await expect(helpButton).toBeVisible();
    await helpButton.hover();
    // Tooltip copy has changed over time; assert it's the Help tooltip and has non-empty content.
    await expect(page.locator('.tooltip-inner-help-cy')).toContainText(
      /learning resources|api documentation|support case management|ask red hat assistant|help/i,
    );
  });
});


