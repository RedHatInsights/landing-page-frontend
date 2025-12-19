import { expect, test } from '@playwright/test';

test.describe('Session init (legacy Cypress parity)', () => {
  test('initializes user session', async ({ page }) => {
    // Session is initialized in `globalSetup` via `storageState`.
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('button', { name: /User Avatar/i })).toBeVisible();
  });
});


