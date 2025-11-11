/* eslint-disable rulesdir/no-chrome-api-call-from-window */
export const isRestrictedEnv = () =>
  ['int', 'scr', 'frh', 'frhStage'].includes(
    window.insights.chrome.getEnvironment(),
  );
