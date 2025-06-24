// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

global.window.crypto = {
  ...crypto,
};
// in case the crypto package is mangled or the method does not exist
if (!global.window.crypto.randomUUID) {
  global.window.crypto.randomUUID = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const insights = {
  chrome: {
    getEnvironment: () => 'prod',
  },
};

global.insights = insights;

global.window = {
  insights,
};

global.__webpack_share_scopes__ = {
  default: {},
};
