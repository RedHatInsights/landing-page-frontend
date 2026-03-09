import { test, expect } from '@playwright/test';

/**
 * Basic E2E tests for the landing page
 * These tests verify the landing page loads correctly in the test environment
 */

test.describe('Landing Page', () => {
  test('should load the landing page successfully', async ({ page }) => {
    // Navigate to the root landing page
    await page.goto('/');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Verify the page title contains expected text
    await expect(page).toHaveTitle(/Console/i);

    // Take a screenshot for debugging
    await page.screenshot({ path: 'playwright-report/landing-page-loaded.png', fullPage: true });
  });

  test('should display landing page content', async ({ page }) => {
    // Navigate to the landing page
    await page.goto('/');

    // Wait for the main content area to be visible
    // Adjust the selector based on your actual page structure
    const mainContent = page.locator('main, [role="main"], #root');
    await expect(mainContent).toBeVisible({ timeout: 15000 });

    // Verify the page is not showing an error state
    const errorMessage = page.locator('text=/error|something went wrong/i');
    await expect(errorMessage).not.toBeVisible();
  });

  test.skip('should navigate to a specific section (example)', async ({ page }) => {
    // This is an example test - you can enable it once you know the specific navigation elements
    await page.goto('/');

    // Example: Click on a navigation link
    // await page.click('a[href="/some-section"]');

    // Example: Verify navigation worked
    // await expect(page).toHaveURL(/some-section/);
  });
});

test.describe('Authentication', () => {
  test('should handle authenticated user state', async ({ page }) => {
    // Navigate to the landing page
    await page.goto('/');

    // In Konflux E2E tests, credentials are injected via environment variables:
    // - process.env.E2E_USER (from e2e-user secret key)
    // - process.env.E2E_PASSWORD (from e2e-password secret key)

    // For now, we just verify the page loads
    // You can add authentication logic here based on your app's auth flow
    await expect(page.locator('body')).toBeVisible();
  });
});
