// Storybook mock for @redhat-cloud-services/chrome's useLastVisited.
// Wired through extraAliases in .storybook/main.ts (deterministic module
// replacement — stronger than per-story moduleMock in browser mode).
export const lastVisitedData = [
  {
    bundle: 'Insights',
    pathname: '/insights/advisor',
    title: 'Advisor recommendations',
  },
  {
    bundle: 'OpenShift',
    pathname: '/openshift/',
    title: 'OpenShift cluster list',
  },
  { bundle: 'Settings', pathname: '/settings/', title: 'Settings' },
];

export const useLastVisited = () => lastVisitedData;
