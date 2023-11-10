const useChrome = () => ({
  isProd: () => true,
  isBeta: () => false,
  visibilityFunctions: { apiRequest: () => Promise.resolve(true) },
  auth: {
    getUser: () =>
      Promise.resolve({
        identity: {
          user: {
            first_name: 'John',
            last_name: 'Doe',
            is_org_admin: true,
          },
        },
      }),
  },
});

export default useChrome;
