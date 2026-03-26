import { test as base } from '@playwright/test';

/**
 * Extended test fixture that automatically blocks TrustArc consent tracking
 * before each test to prevent cookie consent dialogs and tracking scripts
 * from interfering with test execution.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Block all TrustArc consent tracking domains (consent.trustarc.com, consent-pref.trustarc.com, etc.)
    await page.route('**://*.trustarc.com/**', (route) => route.abort());

    await use(page);
  },
});

export { expect } from '@playwright/test';
