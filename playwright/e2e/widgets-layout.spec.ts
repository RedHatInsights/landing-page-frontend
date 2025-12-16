import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Landing page widget layout operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1500 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
  });

  test('closes all the widgets and shows empty dashboard state', async ({ page }) => {
    const container = page.locator('#widget-layout-container');

    // Remove widgets iteratively; the set of toggles changes as we remove items.
    // This mirrors the Cypress retry loop but without hard sleeps.
    while ((await page.locator('[aria-label="widget actions menu toggle"]').count()) > 0) {
      const beforeCount = await page
        .locator('[aria-label="widget actions menu toggle"]')
        .count();
      const toggle = page.locator('[aria-label="widget actions menu toggle"]').first();
      await toggle.scrollIntoViewIfNeeded();
      await toggle.click();

      await page.locator('[data-ouia-component-id="remove-widget"]').click();
      await expect(page.locator('[aria-label="widget actions menu toggle"]')).toHaveCount(
        beforeCount - 1,
        { timeout: 60000 },
      );
    }

    await expect(container.getByRole('heading', { name: /no dashboard content/i })).toBeVisible();
  });

  test('widgets can be dragged and dropped (layout PATCH changes)', async ({ page }) => {
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
    const patch = page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });

    const widget = page.locator('#widget-layout-container [tabindex="0"]').first();
    await expect(widget).toBeVisible();

    const before = await widget.boundingBox();
    expect(before?.width).toBeTruthy();

    const handle = widget.locator('.react-resizable-handle-ne');
    await expect(handle).toBeVisible();
    const hb = await handle.boundingBox();
    expect(hb).toBeTruthy();
    if (!hb) return;

    await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2);
    await page.mouse.down();
    await page.mouse.move(hb.x + hb.width / 2 + 500, hb.y + hb.height / 2, { steps: 10 });
    await page.mouse.up();

    await expect(widget).toHaveClass(/widget-columns-2/);

    const after = await widget.boundingBox();
    expect(after?.width).toBeTruthy();
    if (before?.width && after?.width) {
      expect(after.width).toBeGreaterThan(before.width + 200);
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

    await page.locator('[aria-label="widget actions menu toggle"]').first().click();
    await page.locator('[data-ouia-component-id="autosize-widget"]').first().click();
    await patch;

    const after = await widget.boundingBox();
    expect(after?.height).toBeTruthy();
    if (before?.height && after?.height) {
      expect(after.height).toBeGreaterThan(before.height);
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

    await page.locator('[aria-label="widget actions menu toggle"]').first().click();
    await page.locator('[data-ouia-component-id="minimize-widget"]').first().click();
    await patch;

    const after = await widget.boundingBox();
    expect(after?.height).toBeTruthy();
    if (before?.height && after?.height) {
      expect(after.height).toBeLessThan(before.height);
    }
  });

  test('lock prevents moving widget, then unlocks', async ({ page }) => {
    const landing = new LandingPage(page);

    const menuToggle = landing.widgetMenuToggle('landing-rhel-widget');
    await expect(menuToggle).toBeVisible();

    const patch = page.waitForResponse((resp) => {
      const url = resp.url();
      return (
        resp.request().method() === 'PATCH' &&
        url.includes('/api/chrome-service/v1/dashboard-templates/') &&
        resp.status() >= 200 &&
        resp.status() < 400
      );
    });
    await menuToggle.click();
    await page.locator('[data-ouia-component-id="lock-widget"] > button').click();
    await patch;

    // Attempt move
    const dragHandle = landing.widget('landing-rhel-widget').locator('.drag-handle');
    const dest = landing.widget('landing-openshift-widget');
    await dragHandle.dragTo(dest);

    // Indirect assertion: first card still contains "Red Hat Enterprise Linux"
    await expect(page.locator('#widget-layout-container .react-grid-item').first()).toContainText(
      'Red Hat Enterprise Linux',
    );

    // Unlock
    await menuToggle.click();
    await page.locator('[data-ouia-component-id="unlock-widget"] > button').click();
  });
});


