import { expect, test } from '@playwright/test';
import { login } from '../helpers/auth';

test.describe('Authentication', () => {
  test('can login via RH SSO and reach the app', async ({ page }) => {
    await login(page);

    await expect(
      page.getByRole('button', { name: /User Avatar/i }),
    ).toBeVisible();
    await expect(page).not.toHaveURL(/sso\.redhat\.com/i);
  });
});
