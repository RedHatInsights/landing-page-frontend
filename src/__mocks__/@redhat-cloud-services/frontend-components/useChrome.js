const useChrome = () => ({
  isProd: () => true,
  isBeta: () => false,
  visibilityFunctions: { apiRequest: () => Promise.resolve(true) },
});

module.exports = useChrome;
