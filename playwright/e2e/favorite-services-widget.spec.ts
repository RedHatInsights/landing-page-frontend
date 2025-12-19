import { type Locator, type Page, expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('My Favorite Services widget', () => {
  const widgetId = 'chrome-favoriteServices-widget';

  async function openServicesMenu(page: Page): Promise<Locator> {
    // This button toggles the All Services sidebar/dropdown in chrome.
    const toggle = page.getByRole('button', {
      name: /Red Hat Hybrid Cloud Console/i,
    });
    await expect(toggle).toBeVisible({ timeout: 60000 });
    await toggle.click();

    const sidebarRoot = page
      .locator('.pf-v6-c-sidebar, .pf-v5-c-sidebar')
      .first();
    await expect(sidebarRoot).toBeVisible({ timeout: 60000 });
    return sidebarRoot;
  }

  async function closeServicesMenu(page: Page): Promise<void> {
    const toggle = page.getByRole('button', {
      name: /Red Hat Hybrid Cloud Console/i,
    });
    await toggle.click().catch(() => undefined);
  }

  async function clickAutomationCategoryIfPresent(
    sidebar: Locator,
  ): Promise<void> {
    // Different chrome variants render this in a left-nav, a tablist, or as a link/button.
    // We search the entire services menu container (not just the content panel).
    const candidates = [
      sidebar.getByRole('tab', { name: /^Automation$/i }),
      sidebar.getByRole('button', { name: /^Automation$/i }),
      sidebar.getByRole('link', { name: /^Automation$/i }),
      sidebar.getByText(/^Automation$/i),
      sidebar.getByText(/automation/i),
    ];

    for (const c of candidates) {
      if (
        await c
          .first()
          .isVisible({ timeout: 1000 })
          .catch(() => false)
      ) {
        await c
          .first()
          .scrollIntoViewIfNeeded()
          .catch(() => undefined);
        await c.first().click();
        return;
      }
    }
  }

  async function setTasksFavorite(
    page: Page,
    shouldBeFavorited: boolean,
  ): Promise<void> {
    const sidebar = await openServicesMenu(page);
    await clickAutomationCategoryIfPresent(sidebar);

    const sidebarContent = sidebar
      .locator('.pf-v6-c-sidebar__content, .pf-v5-c-sidebar__content')
      .first();

    const tasksLink = sidebarContent
      .getByRole('link', { name: /^Tasks$/ })
      .or(sidebarContent.locator('a[href*="/insights/tasks"]'))
      .first();
    await expect(tasksLink).toBeVisible({ timeout: 60000 });
    await tasksLink.scrollIntoViewIfNeeded();

    // In the topbar services dropdown, each service is rendered as a tile/link that contains
    // a `.chr-c-favorite-trigger` container and a `...-FavoriteToggle` plain button.
    const trigger = tasksLink.locator('.chr-c-favorite-trigger').first();
    await expect(trigger).toBeVisible({ timeout: 60000 });

    const isFavorited = async () =>
      (await trigger.getAttribute('class'))?.includes('chr-c-icon-favorited') ??
      false;

    const before = await isFavorited();
    if (before === shouldBeFavorited) {
      await closeServicesMenu(page);
      return;
    }

    // Prefer the dropdown tile's FavoriteToggle button (no aria-label), but fall back to the
    // legacy list variant which uses an Icon with aria-label "Favorite {title}".
    const starButton = tasksLink
      .locator('button[data-ouia-component-id$="-FavoriteToggle"]')
      .first();
    const starIconFallback = tasksLink
      .getByLabel(/(unfavorite|favorite)\s+tasks/i)
      .first();

    if (await starButton.isVisible({ timeout: 1500 }).catch(() => false)) {
      await starButton.click();
    } else {
      await expect(starIconFallback).toBeVisible({ timeout: 60000 });
      await starIconFallback.click();
    }

    const apiWait = page
      .waitForResponse(
        (resp) => {
          const url = resp.url();
          const method = resp.request().method();
          return (
            url.includes('/api/chrome-service/v1/favorite-pages') &&
            (method === 'POST' || method === 'DELETE') &&
            resp.status() >= 200 &&
            resp.status() < 400
          );
        },
        { timeout: 20000 },
      )
      .catch(() => undefined);

    await apiWait;
    await expect.poll(isFavorited, { timeout: 60000 }).toBe(shouldBeFavorited);

    await closeServicesMenu(page);
  }

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
    await expect(
      landing.widget(widgetId).getByRole('heading', { level: 3 }),
    ).toContainText(/no favorited services/i);
  });

  test('shows favorites when they are set', async ({ page }) => {
    const landing = new LandingPage(page);
    test.setTimeout(90000);

    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();

    try {
      // Favoriting via UI avoids brittle stubbing and matches real user behavior.
      await setTasksFavorite(page, true);

      const widget = landing.widget(widgetId);
      await expect(widget).toBeVisible();
      await expect(widget.getByText(/no favorited services/i)).toHaveCount(0, {
        timeout: 60000,
      });
      await expect(widget.locator('a[href*="/insights/tasks"]')).toBeVisible({
        timeout: 60000,
      });
    } finally {
      // Cleanup: restore state for subsequent test runs.
      await setTasksFavorite(page, false).catch(() => undefined);
    }
  });
});
