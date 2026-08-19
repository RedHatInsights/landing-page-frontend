import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { disableCookiePrompt } from '@redhat-cloud-services/playwright-test-auth';
import { TIMEOUTS } from '../constants';

export type FavoritePage = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  pathname: string;
  favorite: boolean;
  userIdentityId: number;
};

export class LandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  widget(widgetId: string): Locator {
    return this.page.locator(
      `.react-grid-item > [data-ouia-component-id="${widgetId}"]`,
    );
  }

  widgetMenuToggle(widgetId: string): Locator {
    return this.widget(widgetId).locator('[aria-label="Widget actions"]');
  }

  private initScriptInstalled = false;

  async gotoAndWaitForLayout(): Promise<void> {
    if (!this.initScriptInstalled) {
      this.initScriptInstalled = true;
      await this.page.addInitScript(() => {
        const tag = '__hmr_overlay_killer';
        if ((window as any)[tag]) return;
        (window as any)[tag] = true;
        function kill() {
          const el = document.getElementById('react-refresh-overlay');
          if (el) el.remove();
        }
        const mo = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const n of m.addedNodes) {
              if (
                n instanceof HTMLElement &&
                n.id === 'react-refresh-overlay'
              ) {
                n.remove();
                return;
              }
            }
          }
        });
        const start = () => {
          kill();
          mo.observe(document.body, { childList: true });
        };
        if (document.body) start();
        else document.addEventListener('DOMContentLoaded', start);
      });
    }

    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await disableCookiePrompt(this.page);

    await expect(
      this.page.getByRole('button', { name: /User Avatar/i }),
    ).toBeVisible({ timeout: TIMEOUTS.PAGE_INTERACTIVE });
  }

  async resetToDefaultLayout(): Promise<void> {
    const templatesReload = this.page
      .waitForResponse(
        (resp) => {
          const url = resp.url();
          return (
            resp.request().method() === 'GET' &&
            url.includes('/api/chrome-service/v1/dashboard-templates') &&
            url.includes('dashboard=landingPage') &&
            resp.status() >= 200 &&
            resp.status() < 400
          );
        },
        { timeout: TIMEOUTS.WIDGET_VISIBLE },
      )
      .then(
        () => undefined,
        () => undefined,
      );

    const resetButton = this.page.getByRole('button', {
      name: /reset to default/i,
    });
    await expect(resetButton).toBeVisible({
      timeout: TIMEOUTS.PAGE_INTERACTIVE,
    });
    await resetButton.click();

    const confirmCheckbox = this.page.locator(
      '[data-ouia-component-id="WarningModal-confirm-checkbox"]',
    );
    const confirmButton = this.page.locator(
      'button[data-ouia-component-id="WarningModal-confirm-button"]',
    );

    // Retry click if the modal didn't appear — handles hydration race where
    // the button is visible but React hasn't attached the event handler yet.
    const modalAppeared = await confirmCheckbox
      .waitFor({ state: 'visible', timeout: TIMEOUTS.OVERLAY_DISMISS })
      .then(
        () => true,
        () => false,
      );
    if (!modalAppeared) {
      await resetButton.click();
    }

    await expect(confirmCheckbox).toBeVisible({
      timeout: TIMEOUTS.MODAL_VISIBLE,
    });
    // Wait for PatternFly modal fade-in animation to complete (prevents "element not stable" errors)
    await this.page.waitForTimeout(300);
    await confirmCheckbox.click();
    await expect(confirmButton).toBeVisible({
      timeout: TIMEOUTS.MODAL_VISIBLE,
    });
    await this.page.waitForTimeout(100); // Let button become enabled/stable after checkbox click
    await confirmButton.click();

    await expect(confirmButton).toHaveCount(0, {
      timeout: TIMEOUTS.MODAL_VISIBLE,
    });

    await templatesReload;

    await this.page
      .locator('#widget-layout-container .react-grid-item')
      .first()
      .waitFor({ state: 'visible', timeout: TIMEOUTS.WIDGET_VISIBLE });
  }

  async dismissOverlays(): Promise<void> {
    await this.page.keyboard.press('Escape');

    const servicesMenu = this.page.locator(
      '[data-testid="chr-c__find-app-service"]',
    );
    if (await servicesMenu.isVisible({ timeout: TIMEOUTS.QUICK_PROBE })) {
      const closeBtn = servicesMenu.getByRole('button', {
        name: /close menu/i,
      });
      if (await closeBtn.isVisible({ timeout: TIMEOUTS.QUICK_PROBE })) {
        await closeBtn.click();
      } else {
        await this.page.keyboard.press('Escape');
      }
      await expect(servicesMenu).not.toBeVisible({
        timeout: TIMEOUTS.OVERLAY_DISMISS,
      });
    }
  }

  async openWidgetActionsMenu(widgetId: string): Promise<void> {
    const menuToggle = this.widgetMenuToggle(widgetId);
    for (let attempt = 0; attempt < 3; attempt++) {
      await menuToggle.click();
      const anyItem = this.page
        .locator(
          '[data-ouia-component-id="lock-widget"], [data-ouia-component-id="unlock-widget"], [data-ouia-component-id="remove-widget"]',
        )
        .first();
      if (await anyItem.isVisible({ timeout: TIMEOUTS.ELEMENT_PROBE })) {
        return;
      }
      await this.page.keyboard.press('Escape');
    }
  }

  private pendingLayoutPatch(timeoutMs = TIMEOUTS.LAYOUT_PATCH): Promise<void> {
    return this.page
      .waitForResponse(
        (resp) => {
          const url = resp.url();
          return (
            resp.request().method() === 'PATCH' &&
            url.includes('/api/chrome-service/v1/dashboard-templates/') &&
            resp.status() >= 200 &&
            resp.status() < 400
          );
        },
        { timeout: timeoutMs },
      )
      .then(
        () => undefined,
        () => undefined,
      );
  }

  async removeWidget(widgetId: string): Promise<void> {
    await expect(this.widget(widgetId)).toBeVisible({
      timeout: TIMEOUTS.WIDGET_VISIBLE,
    });

    const openMenu = async () => {
      await this.widgetMenuToggle(widgetId).click();
    };

    await openMenu();

    const removeMenuItem = this.page
      .locator(
        '[data-ouia-component-id="remove-widget"] button[role="menuitem"]',
      )
      .first();
    await expect(removeMenuItem).toBeVisible({
      timeout: TIMEOUTS.MENU_VISIBLE,
    });

    if (await removeMenuItem.isDisabled()) {
      const unlockMenuItem = this.page
        .locator(
          '[data-ouia-component-id="unlock-widget"] button[role="menuitem"]',
        )
        .first();
      if (await unlockMenuItem.isVisible({ timeout: TIMEOUTS.ELEMENT_PROBE })) {
        const unlockPatch = this.pendingLayoutPatch();
        await unlockMenuItem.click();
        await unlockPatch;
        await this.widgetMenuToggle(widgetId).click();
        await expect(removeMenuItem).toBeVisible({
          timeout: TIMEOUTS.MENU_VISIBLE,
        });
      }
    }

    const clickRemove = async () => {
      const patch = this.pendingLayoutPatch();
      await removeMenuItem.click();
      await patch;
    };

    await clickRemove();

    if ((await this.widget(widgetId).count()) > 0) {
      const removed = await expect
        .poll(() => this.widget(widgetId).count(), {
          timeout: TIMEOUTS.WIDGET_REMOVAL,
        })
        .toBe(0)
        .then(
          () => true,
          () => false,
        );

      if (!removed) {
        await openMenu();
        await clickRemove();
        await expect
          .poll(() => this.widget(widgetId).count(), {
            timeout: TIMEOUTS.WIDGET_REMOVAL,
          })
          .toBe(0);
      }
    }
  }

  async addWidget(
    widgetName: string,
    widgetTargetId = 'landing-./RhelWidget-widget',
  ): Promise<void> {
    await this.page
      .locator('[data-ouia-component-id="add-widget-button"]')
      .click();

    const draggable = this.page.locator(
      `[data-ouia-component-id="add-widget-card-${widgetName}"]`,
    );
    await expect(draggable).toBeVisible();

    await draggable.dragTo(this.widget(widgetTargetId));
  }

  /** @deprecated Use UI-based interactions instead of API stubbing in E2E tests. */
  async stubFavoritePages(favoritePages: FavoritePage[]): Promise<void> {
    await this.page.route('**/api/chrome-service/v1/user', async (route) => {
      const resp = await route.fetch();
      const contentType = resp.headers()['content-type'] ?? '';

      if (!contentType.includes('application/json')) {
        await route.fulfill({ response: resp });
        return;
      }

      const json = (await resp.json()) as Record<string, unknown>;
      const data =
        (json.data as Record<string, unknown> | undefined) ??
        ({} as Record<string, unknown>);
      json.data = data;

      if ('favoritePages' in data) {
        data.favoritePages = favoritePages as unknown[];
      } else if ('favorite_pages' in data) {
        data.favorite_pages = favoritePages as unknown[];
      } else {
        data.favoritePages = favoritePages as unknown[];
      }

      await route.fulfill({ response: resp, json });
    });

    // The DashboardFavorites widget may also fetch from the dedicated endpoint.
    await this.page.route(
      '**/api/chrome-service/v1/favorite-pages',
      async (route) => {
        if (route.request().method() !== 'GET') {
          await route.fallback();
          return;
        }
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: favoritePages }),
        });
      },
    );
  }
}
