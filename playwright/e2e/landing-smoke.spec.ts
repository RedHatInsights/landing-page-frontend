import { expect, test } from '../fixtures';
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
      'rhel-widget',
      'openshift-widget',
      'ansible-widget',
      'exploreCapabilities-widget',
      'recentlyVisited-widget',
      'favoriteServices-widget',
      'openshiftAi-widget',
      'imageBuilder-widget',
      'acs-widget',
    ];

    for (const id of widgetIds) {
      await expect(landing.widget(id)).toBeVisible();
    }
  });
});


