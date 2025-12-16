import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('can login via RH SSO and reach the app', async ({ page }) => {
    // Login is performed in `globalSetup` via `storageState`.
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(
      page.getByRole('button', { name: /User Avatar/i }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/sso\.redhat\.com/i);
  });
});
