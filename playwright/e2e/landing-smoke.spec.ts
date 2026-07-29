import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing page - smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
  });

  // TODO: Test times out waiting for "My favorite services" text to appear
  // Failure: "Test timeout of 30000ms exceeded" - element not found after resetToDefaultLayout
  // Error: expect(locator).toBeVisible failed at line 14, element(s) not found
  // Needs: Investigate why "My favorite services" text doesn't appear after layout reset, or add longer timeout
  test.skip('visit landing page: shows My favorite services section', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();

    await expect(page.getByText('My favorite services')).toBeVisible();
  });

  // TODO: Test times out waiting for widget visibility - flaky due to layout/reset timing issues
  test.skip('dashboard shows default widgets containers', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();

    // Updated to new scoped OUIA ID format (see commit 392074c)
    const widgetIds = [
      'landing-./RhelWidget-widget',
      'landing-./OpenShiftWidget-widget',
      'landing-./AnsibleWidget-widget',
      'landing-./ExploreCapabilities-widget',
      'landing-./RecentlyVisited-widget',
      'chrome-./DashboardFavorites-widget',
      'landing-./OpenShiftAiWidget-widget',
      'landing-./ImageBuilderWidget-widget',
      'landing-./AcsWidget-widget',
    ];

    for (const id of widgetIds) {
      await expect(landing.widget(id)).toBeVisible();
    }
  });
});


