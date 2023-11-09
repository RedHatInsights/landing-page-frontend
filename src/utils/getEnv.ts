// eslint-disable-next-line rulesdir/no-chrome-api-call-from-window
export const isIntEnv = window.insights.chrome.getEnvironment() === 'int';
