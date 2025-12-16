import { expect, test } from '@playwright/test';
import { login } from '../helpers/auth';

test.describe('Session init (legacy Cypress parity)', () => {
  test('initializes user session', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('button', { name: /User Avatar/i })).toBeVisible();
  });
});


