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

    const widgetIds = [
      'landing-rhel-widget',
      'landing-openshift-widget',
      'landing-ansible-widget',
      'landing-exploreCapabilities-widget',
      'landing-recentlyVisited-widget',
      'chrome-favoriteServices-widget',
      'landing-openshiftAi-widget',
      'landing-imageBuilder-widget',
      'landing-acs-widget',
    ];

    for (const id of widgetIds) {
      await expect(landing.widget(id)).toBeVisible();
    }
  });
});


