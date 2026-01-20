import { expect, test } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';

test.describe('Integrations widget', () => {
  const widgetId = 'sources-integrations-widget';

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 2000 });
    const landing = new LandingPage(page);
    await landing.gotoAndWaitForLayout();
    await landing.resetToDefaultLayout();
  });

  test('does not appear in the default layout', async ({ page }) => {
    const landing = new LandingPage(page);
    await expect(landing.widget(widgetId)).toHaveCount(0);
  });

  test('can be added and removed from the layout', async ({ page }) => {
    const landing = new LandingPage(page);

    await landing.addWidget('Integrations');
    await expect(landing.widget(widgetId)).toBeVisible();

    await landing.removeWidget(widgetId);
    await expect(landing.widget(widgetId)).toHaveCount(0);
  });

  test('allows expanding categories (no hidden sections remain)', async ({ page }) => {
    const landing = new LandingPage(page);

    await landing.addWidget('Integrations');
    const widget = landing.widget(widgetId);
    await expect(widget).toBeVisible();

    const toggles = widget.locator(
      '[id^="expandable-section-toggle"][aria-expanded="false"]',
    );
    const count = await toggles.count();
    for (let i = 0; i < count; i++) {
      await toggles.nth(i).click();
    }

    // If the widget starts fully expanded, count may already be 0.
    await expect(
      widget.locator('[id^="expandable-section-toggle"][aria-expanded="false"]'),
    ).toHaveCount(0);
    await landing.removeWidget(widgetId);
  });

  test('can start creating an integration (opens Add Red Hat integration wizard)', async ({ page }) => {
    const landing = new LandingPage(page);

    await landing.addWidget('Integrations');
    const widget = landing.widget(widgetId);
    await expect(widget).toBeVisible();

    await widget.getByRole('button', { name: /create integration/i }).click();
    await page.getByRole('menuitem', { name: /red hat/i }).click();

    await expect(page.getByRole('heading', { name: /add red hat integration/i })).toBeVisible();
    await page
      .locator('div[name="wizard"] button[aria-label="Close wizard"]')
      .click()
      .catch(async () => {
        await page.getByRole('button', { name: /close wizard/i }).click();
      });
  });
});


