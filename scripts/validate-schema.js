/**
 * mock global variables
 */
global.window = {
  insights: {
    chrome: {
      isBeta: () => false,
      getEnvironment: () => 'prod',
    },
  },
};

run();
