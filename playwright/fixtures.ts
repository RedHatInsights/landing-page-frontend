import { test as base } from '@playwright/test';

/**
 * Extended test fixture that automatically blocks TrustArc consent tracking
 * before each test to prevent cookie consent dialogs and tracking scripts
 * from interfering with test execution.
 */
export const test = base.extend({
  context: async ({ context }, use) => {
    // Block all TrustArc consent tracking domains at context level
    await context.route('**://*.trustarc.com/**', (route) => route.abort());

    await use(context);
  },
});

export { expect } from '@playwright/test';
