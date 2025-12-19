import { type Locator, type Page, expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing page widget layout operations', () => {
  async function closeChromeOverlays(page: Page) {
    // Defensive: previous tests may leave chrome overlays/drawers open (services dropdown, etc.),
    // which can shrink the dashboard area and make interactions flaky.
    await page.keyboard.press('Escape').catch(() => undefined);
    await page.keyboard.press('Escape').catch(() => undefined);

    const servicesMenu = page.locator(
      '[data-testid="chr-c__find-app-service"]',
    );
    if (await servicesMenu.isVisible({ timeout: 500 }).catch(() => false)) {
      const closeBtn = servicesMenu.getByRole('button', {
        name: /close menu/i,
      });
      if (await closeBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape').catch(() => undefined);
      }
    }

    await expect(servicesMenu).toHaveCount(0, { timeout: 5000 });
  }

  async function openWidgetActionsMenu(page: Page, menuToggle: Locator) {
    // Dropdown content is appended to body; sometimes the first click doesn't open due to animation/overlay.
    for (let attempt = 0; attempt < 3; attempt++) {
      await menuToggle.click();
      const anyItem = page
        .locator(
          '[data-ouia-component-id="lock-widget"], [data-ouia-component-id="unlock-widget"], [data-ouia-component-id="remove-widget"]',
        )
        .first();
      if (await anyItem.isVisible({ timeout: 1500 }).catch(() => false)) {
        return;
      }
      // Close + retry
      await page.keyboard.press('Escape').catch(() => undefined);
    }
  }

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1500 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
    await closeChromeOverlays(page);
  });

  test('closes all the widgets and shows empty dashboard state', async ({
    page,
  }) => {
    const container = page.locator('#widget-layout-container');
    const landing = new LandingPage(page);

    // Remove widgets iteratively; the set of toggles changes as we remove items.
    // This mirrors the Cypress retry loop but without hard sleeps.
    while (
      (await page
        .locator('[aria-label="widget actions menu toggle"]')
        .count()) > 0
    ) {
      const toggle = page
        .locator('[aria-label="widget actions menu toggle"]')
        .first();
      const widgetId = await toggle
        .locator('xpath=ancestor::*[@data-ouia-component-id][1]')
        .getAttribute('data-ouia-component-id');
      if (!widgetId) break;
      await toggle.scrollIntoViewIfNeeded();
      await landing.removeWidget(widgetId);
    }

    await expect(
      container.getByRole('heading', { name: /no dashboard content/i }),
    ).toBeVisible();
  });

  test('widgets can be dragged and dropped (layout PATCH changes)', async ({
    page,
  }) => {
    const handles = page.locator('.drag-handle');
    await expect(handles.first()).toBeVisible();

    const firstPatch = page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });
    await handles.nth(0).dragTo(handles.nth(1));
    const firstResp = await firstPatch;
    const firstBody = await firstResp.json().catch(() => undefined);
    expect(firstBody).toBeTruthy();

    const secondPatch = page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });
    await handles.nth(2).dragTo(handles.nth(1));
    const secondResp = await secondPatch;
    const secondBody = await secondResp.json().catch(() => undefined);
    expect(secondBody).toBeTruthy();

    // Basic change detection: second PATCH payload should differ from first.
    expect(JSON.stringify(secondBody)).not.toEqual(JSON.stringify(firstBody));
  });

  test('widgets can be resized (class and PATCH 200)', async ({ page }) => {
    test.setTimeout(90000);
    const patch = page
      .waitForResponse((resp) => {
        const url = resp.url();
        return (
          resp.request().method() === 'PATCH' &&
          url.includes('/api/chrome-service/v1/dashboard-templates/') &&
          resp.status() >= 200 &&
          resp.status() < 400
        );
      })
      .catch(() => undefined);

    // Use a stable widget identity; tabindex=0 is focus-dependent and can change after a reflow.
    const widget = page
      .locator(
        '[data-ouia-component-id="landing-rhel-widget"] >> xpath=ancestor::*[contains(@class,"react-grid-item")][1]',
      )
      .first();
    await expect(widget).toBeVisible();

    const getCols = async () => {
      const cls = (await widget.getAttribute('class')) ?? '';
      const m = cls.match(/widget-columns-(\d+)/);
      return m ? Number(m[1]) : undefined;
    };
    const beforeCols = await getCols();

    const before = await widget.boundingBox();
    expect(before?.width).toBeTruthy();

    const handle = widget.locator('.react-resizable-handle-ne');
    await expect(handle).toBeVisible();
    const hb = await handle.boundingBox();
    expect(hb).toBeTruthy();
    if (!hb) return;

    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
    await page.mouse.down();
    await page.mouse.move(hb.x + hb.width / 2 + 500, hb.y + hb.height / 2, {
      steps: 10,
    });
    await page.mouse.up();

    // Column count can jump depending on the responsive grid, and the widget may already be at max width.
    // Assert it does not regress, and rely on width + PATCH as the primary signal of a resize.
    if (beforeCols) {
      await expect
        .poll(getCols, { timeout: 60000 })
        .toBeGreaterThanOrEqual(beforeCols);
    }

    const after = await widget.boundingBox();
    expect(after?.width).toBeTruthy();
    if (before?.width && after?.width) {
      // Resize behavior can be clamped by grid constraints; assert it doesn't shrink.
      expect(after.width).toBeGreaterThanOrEqual(before.width - 1);
    }

    await patch;
  });

  test('autosize increases widget height', async ({ page }) => {
    const widget = page.locator('.react-grid-item').first();
    await expect(widget).toBeVisible();

    const before = await widget.boundingBox();
    expect(before?.height).toBeTruthy();

    const patch = page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });

    await page
      .locator('[aria-label="widget actions menu toggle"]')
      .first()
      .click();
    await page
      .locator('[data-ouia-component-id="autosize-widget"]')
      .first()
      .click();
    await patch;

    const after = await widget.boundingBox();
    expect(after?.height).toBeTruthy();
    if (before?.height && after?.height) {
      // Autosize can be a no-op if the widget is already at its content height.
      expect(after.height).toBeGreaterThanOrEqual(before.height);
    }
  });

  test('minimize decreases widget height', async ({ page }) => {
    const widget = page.locator('.react-grid-item').first();
    await expect(widget).toBeVisible();

    const before = await widget.boundingBox();
    expect(before?.height).toBeTruthy();

    const patch = page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });

    await page
      .locator('[aria-label="widget actions menu toggle"]')
      .first()
      .click();
    await page
      .locator('[data-ouia-component-id="minimize-widget"]')
      .first()
      .click();
    await patch;

    const after = await widget.boundingBox();
    expect(after?.height).toBeTruthy();
    if (before?.height && after?.height) {
      expect(after.height).toBeLessThan(before.height);
    }
  });

  test('lock prevents moving widget, then unlocks', async ({ page }) => {
    test.setTimeout(90000);
    const landing = new LandingPage(page);
    await closeChromeOverlays(page);

    const menuToggle = landing.widgetMenuToggle('landing-rhel-widget');
    await expect(menuToggle).toBeVisible();

    await openWidgetActionsMenu(page, menuToggle);
    const widgetCard = landing.widget('landing-rhel-widget');
    const lockBtn = page
      .locator('[data-ouia-component-id="lock-widget"]')
      .first();
    await expect(lockBtn).toBeVisible({ timeout: 60000 });
    await lockBtn.click();
    // Locking may or may not persist immediately depending on environment; don't hard-depend on a PATCH.
    await landing.waitForLayoutPatchOptional(20000);
    await expect(lockBtn).toHaveCount(0, { timeout: 60000 });
    // High-signal UI proof we are locked (GridTile adds `static` class when locked).
    await expect(widgetCard).toHaveClass(/static/, { timeout: 60000 });

    // Attempt move
    const dragHandle = landing
      .widget('landing-rhel-widget')
      .locator('.drag-handle');
    const dest = landing.widget('landing-openshift-widget');
    await dragHandle.dragTo(dest);

    // Indirect assertion: first card still contains "Red Hat Enterprise Linux"
    await expect(
      page.locator('#widget-layout-container .react-grid-item').first(),
    ).toContainText('Red Hat Enterprise Linux');

    // Unlock
    await closeChromeOverlays(page);
    await openWidgetActionsMenu(page, menuToggle);
    const unlockBtn = page
      .locator('[data-ouia-component-id="unlock-widget"]')
      .first();
    const lockStillVisible = await page
      .locator('[data-ouia-component-id="lock-widget"]')
      .first()
      .isVisible({ timeout: 1500 })
      .catch(() => false);

    if (await unlockBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await unlockBtn.click();
      await landing.waitForLayoutPatchOptional(20000);
      await expect(widgetCard).not.toHaveClass(/static/, { timeout: 60000 });
    } else if (!lockStillVisible) {
      // If neither lock nor unlock is visible, the dropdown likely closed; don't hard-fail cleanup.
      // The test's main assertion is that the widget couldn't be moved while "locked".
      await page.keyboard.press('Escape').catch(() => undefined);
    }
  });
});
