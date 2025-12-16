import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

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

  private async acceptCookiesIfPresent(): Promise<void> {
    const accept = this.page.getByRole('button', { name: /accept all/i });
    if (await accept.isVisible({ timeout: 1500 }).catch(() => false)) {
      await accept.click();
    }
  }

  private isOkishStatus(status: number): boolean {
    // Treat redirects/caching as OK for our network “presence” waits.
    return status >= 200 && status < 400;
  }

  widget(widgetId: string): Locator {
    return this.page.locator(`[data-ouia-component-id="${widgetId}"]`);
  }

  widgetMenuToggle(widgetId: string): Locator {
    return this.widget(widgetId).locator(
      '[aria-label="widget actions menu toggle"]',
    );
  }

  async gotoAndWaitForLayout(): Promise<void> {
    const layoutResp = this.page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'GET' &&
        url.includes('/api/chrome-service/v1/dashboard-templates') &&
        url.includes('dashboard=landingPage') &&
        this.isOkishStatus(resp.status())
      );
    });

    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();

    // Some environments cache this request; don’t hard-fail if it doesn’t fire.
    await Promise.race([
      layoutResp.catch(() => undefined),
      this.page
        .locator('#widget-layout-container')
        .waitFor({ state: 'visible', timeout: 60000 })
        .catch(() => undefined),
    ]);

    // A high-signal “page is interactive” check for console apps.
    await expect(
      this.page.getByRole('button', { name: /User Avatar/i }),
    ).toBeVisible({ timeout: 60000 });
  }

  async resetToDefaultLayout(): Promise<void> {
    const resetResp = this.page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'POST' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        url.includes('/reset') &&
        this.isOkishStatus(resp.status())
      );
    });

    const resetButton = this.page.getByRole('button', {
      name: /reset to default/i,
    });
    await expect(resetButton).toBeVisible({ timeout: 60000 });
    await resetButton.scrollIntoViewIfNeeded();
    await resetButton.click();
    await this.page
      .locator(`[data-ouia-component-id="WarningModal-confirm-checkbox"]`)
      .click();
    await this.page
      .locator(`button[data-ouia-component-id="WarningModal-confirm-button"]`)
      .click();

    await resetResp;
  }

  async waitForLayoutPatchOptional(timeoutMs = 15000): Promise<void> {
    await this.page
      .waitForResponse(
        (resp) => {
          const url = resp.url();
          return (
            resp.request().method() === 'PATCH' &&
            url.includes('/api/chrome-service/v1/dashboard-templates/') &&
            this.isOkishStatus(resp.status())
          );
        },
        { timeout: timeoutMs },
      )
      .catch(() => undefined);
  }

  async waitForLayoutPatchStrict(timeoutMs = 60000): Promise<void> {
    await this.page.waitForResponse(
      (resp) => {
        const url = resp.url();
        return (
          resp.request().method() === 'PATCH' &&
          url.includes('/api/chrome-service/v1/dashboard-templates/') &&
          this.isOkishStatus(resp.status())
        );
      },
      { timeout: timeoutMs },
    );
  }

  async waitForLayoutPatch(): Promise<void> {
    await this.page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        this.isOkishStatus(resp.status())
      );
    });
  }

  async removeWidget(widgetId: string): Promise<void> {
    await expect(this.widget(widgetId)).toBeVisible({ timeout: 60000 });

    await this.widgetMenuToggle(widgetId).click();

    await this.page.locator('[data-ouia-component-id="remove-widget"]').click();
    await this.waitForLayoutPatchOptional();

    await expect(this.widget(widgetId)).toHaveCount(0);
  }

  async addWidget(
    widgetName: string,
    widgetTargetId = 'landing-rhel-widget',
  ): Promise<void> {
    await this.page
      .locator('[data-ouia-component-id="add-widget-button"]')
      .click();

    const draggable = this.page.locator(
      `[data-ouia-component-id="add-widget-card-${widgetName}"]`,
    );
    await expect(draggable).toBeVisible();

    await draggable.dragTo(this.widget(widgetTargetId));
    await this.waitForLayoutPatchOptional();
  }

  async stubFavoritePages(favoritePages: FavoritePage[]): Promise<void> {
    await this.page.route('**/api/chrome-service/v1/user', async (route) => {
      const resp = await route.fetch();
      const contentType = resp.headers()['content-type'] ?? '';

      // If the endpoint ever returns something unexpected, fall back to passthrough
      // (keeps the suite from failing on non-JSON environments).
      if (!contentType.includes('application/json')) {
        await route.fulfill({ response: resp });
        return;
      }

      const json = (await resp.json()) as Record<string, unknown>;
      const data =
        (json.data as Record<string, unknown> | undefined) ??
        ({} as Record<string, unknown>);
      json.data = data;

      // Handle common response shapes (the exact field name can drift).
      if ('favoritePages' in data) {
        data.favoritePages = favoritePages as unknown[];
      } else if ('favorite_pages' in data) {
        data.favorite_pages = favoritePages as unknown[];
      } else {
        data.favoritePages = favoritePages as unknown[];
      }

      await route.fulfill({ response: resp, json });
    });
  }
}
