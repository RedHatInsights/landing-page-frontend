import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing page - smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
  });

  test('visit landing page: shows My favorite services section', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();

    await expect(page.getByText('My favorite services')).toBeVisible();
  });

  test('dashboard shows default widgets containers', async ({ page }) => {
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


