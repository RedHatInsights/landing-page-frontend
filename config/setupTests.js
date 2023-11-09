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
