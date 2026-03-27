import { test as base } from '@playwright/test';

// WAF rule IPBLOCK-BURST4-95703: max 7 non-GET/HEAD requests per second.
// 1000ms / 7 ≈ 143ms — use 150ms to stay safely under the limit.
const RATE_LIMIT_DELAY_MS = parseInt(
  process.env.PLAYWRIGHT_RATE_LIMIT_MS ?? '150',
  10
);
const RATE_LIMITED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * Extended test fixture that automatically blocks TrustArc consent tracking
 * before each test to prevent cookie consent dialogs and tracking scripts
 * from interfering with test execution.
 *
 * Also serializes non-GET/HEAD requests with a delay between each to avoid
 * triggering WAF rate-limit rules. Tunable via PLAYWRIGHT_RATE_LIMIT_MS
 * env var (set to 0 to disable).
 */
export const test = base.extend({
  context: async ({ context }, use) => {
    // Block all TrustArc consent tracking domains at context level
    await context.route('**://*.trustarc.com/**', (route) => route.abort());

    // Serialize non-GET/HEAD requests to stay under WAF burst limits
    if (RATE_LIMIT_DELAY_MS > 0) {
      let pending = Promise.resolve();
      await context.route('**/*', (route, request) => {
        if (!RATE_LIMITED_METHODS.has(request.method())) {
          return route.continue();
        }
        // Chain each rate-limited request so they execute sequentially
        pending = pending.then(
          () =>
            new Promise<void>((resolve) => {
              setTimeout(async () => {
                await route.continue();
                resolve();
              }, RATE_LIMIT_DELAY_MS);
            })
        );
        return pending;
      });
    }

    await use(context);
  },
  page: async ({ page }, use) => {
    // Hide TrustArc overlay DOM elements that intercept pointer events.
    // Route blocking prevents iframe content from loading, but the TrustArc
    // init script still injects overlay/iframe elements into the DOM.
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.textContent =
        '.truste_overlay, .truste_box_overlay, .truste_popframe { display: none !important; }';
      (document.head || document.documentElement).appendChild(style);
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';
