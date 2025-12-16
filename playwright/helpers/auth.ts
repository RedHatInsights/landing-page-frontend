import { type Locator, type Page, expect } from '@playwright/test';

type LoginOptions = {
  username?: string;
  password?: string;
};

async function clickIfVisible(locator: Locator, timeoutMs = 2500) {
  const visible = await locator
    .isVisible({ timeout: timeoutMs })
    .catch(() => false);
  if (visible) {
    await locator.click();
  }
}

async function acceptCookiesIfPresent(page: Page) {
  // Seen on app domain and sometimes after login; don't fail if it's not present.
  await clickIfVisible(page.getByRole('button', { name: /accept all/i }), 2000);
}

/**
 * Performs the RH SSO login flow for E2E tests.
 *
 * Requires `E2E_USER` and `E2E_PASSWORD` env vars unless overridden via options.
 */
export async function login(page: Page, options: LoginOptions = {}) {
  const env: Record<string, string | undefined> =
    (
      globalThis as unknown as {
        process?: { env?: Record<string, string | undefined> };
      }
    ).process?.env ?? {};
  const username = options.username ?? env.E2E_USER;
  const password = options.password ?? env.E2E_PASSWORD;

  if (!username) {
    throw new Error(
      'Missing E2E_USER env var (or pass { username } to login()).',
    );
  }
  if (!password) {
    throw new Error(
      'Missing E2E_PASSWORD env var (or pass { password } to login()).',
    );
  }

  const userAvatarButton = page.getByRole('button', { name: /User Avatar/i });

  // Always start from app root; baseURL is configured in playwright.config.ts
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // If we're already authenticated (cached state), avoid re-running the SSO flow.
  if (await userAvatarButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await acceptCookiesIfPresent(page);
    return;
  }

  // Step 1: username
  const usernameField = page.locator('#username-verification');
  await expect(usernameField).toBeVisible({ timeout: 60000 });
  await usernameField.fill(username);

  // Click "Next" to move to password step
  const step2Button = page.locator('#login-show-step2');
  if (await step2Button.isVisible({ timeout: 5000 }).catch(() => false)) {
    await step2Button.click();
  } else {
    await page
      .getByRole('button', { name: /next|continue|log in|sign in/i })
      .click();
  }

  // Step 2: password
  const passwordField = page.locator('#password');
  await expect(passwordField).toBeVisible({ timeout: 60000 });
  await passwordField.fill(password);

  const submitButton = page.locator('#rh-password-verification-submit-button');
  if (await submitButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await submitButton.click();
  } else {
    await page
      .getByRole('button', { name: /next|continue|log in|sign in/i })
      .click();
  }

  // Wait until we're back on the app and can see the avatar.
  await expect(userAvatarButton).toBeVisible({ timeout: 60000 });

  // Disable analytics integrations (must be after navigation to app domain)
  await page
    .evaluate(() => {
      localStorage.setItem('chrome:analytics:disable', 'true');
      localStorage.setItem('chrome:segment:disable', 'true');
    })
    .catch(() => undefined);

  await acceptCookiesIfPresent(page);
}
