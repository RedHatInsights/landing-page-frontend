import { expect, test } from '@playwright/test';
import { type FavoritePage, LandingPage } from '../pages/LandingPage';

test.describe('My Favorite Services widget', () => {
  const widgetId = 'chrome-favoriteServices-widget';

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
  });

  test('appears in the default layout', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.stubFavoritePages([]);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();

    await expect(landing.widget(widgetId)).toBeVisible();
  });

  test('disappears when removed from the layout', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.stubFavoritePages([]);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();

    await landing.removeWidget(widgetId);
  });

  test('shows empty state when no favorites are set', async ({ page }) => {
    const landing = new LandingPage(page);
    await landing.stubFavoritePages([]);

    const favoritesResp = page.waitForResponse((resp) => {
      return (
        resp.request().method() === 'GET' &&
        resp.url().includes('/api/chrome-service/v1/user') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });

    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
    await favoritesResp;

    await expect(landing.widget(widgetId)).toBeVisible();
    await expect(landing.widget(widgetId).getByRole('heading', { level: 3 })).toContainText(
      /no favorited services/i,
    );
  });

  test('shows favorites when they are set', async ({ page }) => {
    const landing = new LandingPage(page);

    const testFavorites: FavoritePage[] = [
      {
        id: 665,
        createdAt: '2024-08-02T19:52:52.29345Z',
        updatedAt: '2024-08-02T19:52:52.29345Z',
        deletedAt: null,
        pathname: '/settings/notifications',
        favorite: true,
        userIdentityId: 1,
      },
      {
        id: 664,
        createdAt: '2024-08-02T19:52:51.305442Z',
        updatedAt: '2024-08-02T19:52:51.305442Z',
        deletedAt: null,
        pathname: '/settings/integrations',
        favorite: true,
        userIdentityId: 1,
      },
    ];

    await landing.stubFavoritePages(testFavorites);

    const favoritesResp = page.waitForResponse((resp) => {
      return (
        resp.request().method() === 'GET' &&
        resp.url().includes('/api/chrome-service/v1/user') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });

    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
    await favoritesResp;

    await expect(landing.widget(widgetId)).toBeVisible();
    await expect(landing.widget(widgetId)).toContainText('Notifications');
    await expect(landing.widget(widgetId)).toContainText('Integrations');
  });
});


