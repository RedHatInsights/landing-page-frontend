// Vitest setup for unit tests (ported from config/setupTests.js — jest globals).
// Property assignment only: never replace `window` whole, prototype-bound
// methods (getComputedStyle etc.) must survive for react-jss/css-vendor.

/* eslint-disable @typescript-eslint/no-explicit-any */

const insights = {
  chrome: {
    getEnvironment: () => 'prod',
  },
};

(globalThis as any).insights = insights;
(globalThis as any).window.insights = insights;
(globalThis as any).window.__webpack_share_scopes__ = {
  default: {},
};

// fix: `matchMedia` not present, jsdom/happy-dom require a polyfill
if (typeof (globalThis as any).matchMedia !== 'function') {
  (globalThis as any).matchMedia = function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
}
